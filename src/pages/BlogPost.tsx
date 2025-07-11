import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content: string) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground text-lg">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Article Content */}
      <article className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-8 hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            {post.image_url && (
              <img 
                src={post.image_url} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              />
            )}
            
            <div className="space-y-4">
              <Badge className="mb-2">{post.category}</Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex items-center space-x-6 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-none">
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none
              prose-headings:text-foreground prose-headings:font-bold prose-headings:leading-tight
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:border-b prose-h1:border-border prose-h1:pb-4
              prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
              prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
              prose-p:text-foreground prose-p:leading-8 prose-p:mb-6 prose-p:text-base
              prose-strong:text-foreground prose-strong:font-semibold
              prose-em:text-muted-foreground prose-em:italic
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-primary-glow
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:my-6
              prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-6 prose-pre:my-6 prose-pre:overflow-x-auto
              prose-ul:mb-6 prose-ul:mt-4 prose-ol:mb-6 prose-ol:mt-4 prose-li:mb-2 prose-li:leading-7
              prose-img:rounded-lg prose-img:shadow-natural prose-img:my-8 prose-img:mx-auto
              prose-table:border prose-table:border-border prose-table:my-6
              prose-thead:bg-muted prose-th:border prose-th:border-border prose-th:p-3 prose-th:text-left
              prose-td:border prose-td:border-border prose-td:p-3">
              
              {renderContent(post.content)}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;