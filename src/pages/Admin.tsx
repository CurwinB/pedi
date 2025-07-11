import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image_url?: string;
  featured: boolean;
  published: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    image_url: "",
    featured: false,
    published: false,
    meta_title: "",
    meta_description: ""
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive"
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const insertHyperlink = () => {
    if (!linkText || !linkUrl) {
      toast({
        title: "Error",
        description: "Please enter both link text and URL",
        variant: "destructive"
      });
      return;
    }

    const hyperlink = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
    setFormData({
      ...formData,
      content: formData.content + hyperlink
    });
    
    setLinkText("");
    setLinkUrl("");
    setIsLinkDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Hyperlink inserted into content"
    });
  };

  const autoFormatContent = (text: string) => {
    // Convert plain text to HTML while preserving formatting
    return text
      // Convert double line breaks to paragraph breaks
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => {
        // Convert single line breaks within paragraphs to <br> tags
        const formattedParagraph = paragraph.replace(/\n/g, '<br>');
        // Wrap in <p> tags if not already HTML
        if (!formattedParagraph.includes('<') && !formattedParagraph.includes('>')) {
          return `<p>${formattedParagraph}</p>`;
        }
        return formattedParagraph;
      })
      .join('\n\n');
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setFormData({...formData, content: newContent});
  };

  const formatTextContent = () => {
    const formatted = autoFormatContent(formData.content);
    setFormData({...formData, content: formatted});
    toast({
      title: "Success", 
      description: "Text formatting applied"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = generateSlug(formData.title);
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const postData = {
        ...formData,
        slug,
        tags,
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Post updated successfully" });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Post created successfully" });
      }

      resetForm();
      fetchPosts();
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      image_url: post.image_url || "",
      featured: post.featured,
      published: post.published,
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || ""
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Post deleted successfully" });
      fetchPosts();
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      tags: "",
      image_url: "",
      featured: false,
      published: false,
      meta_title: "",
      meta_description: ""
    });
    setIsCreating(false);
    setEditingPost(null);
    setLinkText("");
    setLinkUrl("");
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">Blog Administration</h1>
            <Button onClick={() => setIsCreating(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Post</span>
            </Button>
          </div>

          {isCreating && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author *</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="e.g. turmeric, health, natural"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content">Content * (HTML supported)</Label>
                      <div className="flex space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={formatTextContent}
                        >
                          Auto-Format Text
                        </Button>
                        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
                          <DialogTrigger asChild>
                            <Button type="button" variant="outline" size="sm">
                              <Link className="h-4 w-4 mr-2" />
                              Add Link
                            </Button>
                          </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Insert Hyperlink</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="linkText">Link Text</Label>
                              <Input
                                id="linkText"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                                placeholder="e.g. Visit our website"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="linkUrl">URL</Label>
                              <Input
                                id="linkUrl"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="https://example.com"
                              />
                            </div>
                            <Button onClick={insertHyperlink} className="w-full">
                              Insert Link
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    </div>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={handleContentChange}
                      rows={12}
                      required
                      placeholder="Write your blog content here. Paste your text and click 'Auto-Format Text' to preserve line breaks and paragraphs automatically."
                    />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2"><strong>Quick formatting options:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Auto-Format Text:</strong> Converts line breaks to paragraphs and preserves formatting</li>
                        <li><code>&lt;h2&gt;Heading&lt;/h2&gt;</code> for section headings</li>
                        <li><code>&lt;strong&gt;Bold text&lt;/strong&gt;</code> for emphasis</li>
                        <li><code>&lt;blockquote&gt;Quote&lt;/blockquote&gt;</code> for quotes</li>
                        <li>Use the "Add Link" button above to insert hyperlinks</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                        placeholder="Will use title if empty"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                      <Input
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                        placeholder="Will use excerpt if empty"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                      />
                      <Label htmlFor="featured">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({...formData, published: checked})}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit">
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        {post.featured && <Badge variant="secondary">Featured</Badge>}
                        <Badge variant={post.published ? "default" : "outline"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        disabled={!post.published}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No blog posts yet. Create your first post!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;