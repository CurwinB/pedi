import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Leaf, Heart, Shield, Search, BookOpen, Users, Lightbulb, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow mb-6">
              <Leaf className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Remedypedia</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your trusted guide to natural healing and remedies, bridging traditional wisdom with modern wellness practices
            </p>
          </div>

          {/* What is Remedypedia */}
          <Card className="shadow-soft mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Heart className="h-7 w-7 text-primary" />
                What is Remedypedia?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Remedypedia is a comprehensive platform dedicated to natural healing and wellness. We serve as your 
                trusted guide through the world of traditional remedies, herbal medicine, and holistic health practices 
                that have been used for generations across different cultures.
              </p>
              <p className="leading-relaxed">
                Our platform brings together time-tested natural solutions with accessible, well-organized information 
                to help you make informed decisions about your wellness journey. Whether you're seeking relief from 
                common ailments or looking to enhance your overall health naturally, Remedypedia provides reliable 
                guidance rooted in tradition and supported by available research.
              </p>
            </CardContent>
          </Card>

          {/* Our Mission */}
          <Card className="shadow-soft mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Lightbulb className="h-7 w-7 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary-soft rounded-xl flex items-center justify-center">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Simple & Accessible</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Making natural wellness information easy to find, understand, and apply in daily life
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary-soft rounded-xl flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Well-Organized</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Structuring wellness knowledge in a clear, searchable format for quick reference
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary-soft rounded-xl flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Trustworthy</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Providing reliable information with proper context and safety considerations
                  </p>
                </div>
              </div>
              
              <div className="bg-primary-soft/30 rounded-xl p-6 mt-8">
                <p className="text-lg text-center text-foreground leading-relaxed">
                  <strong>Our mission is to democratize access to natural wellness knowledge</strong> by providing 
                  simple, accessible, and well-organized information that empowers people to explore traditional 
                  healing practices safely and effectively.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Curate Content */}
          <Card className="shadow-soft mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CheckCircle className="h-7 w-7 text-primary" />
                How We Curate Our Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our remedies and wellness information are carefully curated based on three key pillars:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-card border-0">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">Traditional Use</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Remedies with documented historical use across cultures and generations
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-card border-0">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">Available Research</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Scientific studies and research supporting traditional healing practices
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-card border-0">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-foreground">Common Practices</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Widely accepted natural health practices used in modern wellness
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Content Creation & Review */}
          <Card className="shadow-soft mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Users className="h-7 w-7 text-primary" />
                Content Creation & Review Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Research & Documentation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We begin by researching traditional uses, documented practices, and available scientific literature 
                      for each remedy and wellness practice.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Safety Assessment</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Each remedy is evaluated for potential interactions, contraindications, and safety considerations 
                      to ensure responsible information sharing.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Clear Presentation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Information is organized into clear, accessible formats with proper usage instructions, 
                      precautions, and disclaimers.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Ongoing Updates</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our content is regularly reviewed and updated to reflect new research findings and 
                      evolving best practices in natural wellness.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="bg-amber-50/50 border-amber-200 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-800">
                <Shield className="h-6 w-6" />
                Important Healthcare Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-amber-700">
              <p className="text-lg leading-relaxed">
                <strong>Remedypedia does not replace professional healthcare advice.</strong> While we provide 
                valuable information about natural remedies and wellness practices, we strongly emphasize that 
                this information is for educational purposes only.
              </p>
              
              <div className="bg-amber-100/50 rounded-lg p-4 border border-amber-300">
                <h3 className="font-semibold text-amber-800 mb-2">Always Remember:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    Consult licensed healthcare providers before starting any new treatment
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    Inform your doctor about any natural remedies you're using
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    Be aware that natural remedies can interact with medications
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    Seek immediate medical attention for serious health concerns
                  </li>
                </ul>
              </div>
              
              <p className="text-center text-amber-800 font-medium">
                Your health and safety are our top priorities. Use this information wisely and responsibly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;