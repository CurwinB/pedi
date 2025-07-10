import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Users, Scale, Shield, ExternalLink } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Terms of <span className="text-white font-bold drop-shadow-lg">Use</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Please read these terms carefully before using our natural health information platform.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Last Updated */}
          <div className="text-center">
            <p className="text-muted-foreground">Last updated: January 15, 2025</p>
          </div>

          {/* Important Notice */}
          <Card className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-orange-800 dark:text-orange-200">
                <AlertTriangle className="h-6 w-6" />
                <span>Important Medical Disclaimer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-orange-700 dark:text-orange-300">
              <p className="leading-relaxed">
                <strong>This platform is for informational purposes only.</strong> The content provided is not intended to be a substitute 
                for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified 
                health provider with any questions you may have regarding a medical condition.
              </p>
              <p className="leading-relaxed">
                Never disregard professional medical advice or delay in seeking it because of something you have read on this platform.
              </p>
            </CardContent>
          </Card>

          {/* Terms Overview */}
          <Card className="bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-primary" />
                <span>Terms Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Remedypedia, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These terms apply to all visitors, users, and others who access or use our platform.
              </p>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-primary" />
                <span>Acceptable Use</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">You May:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Access and search our natural health information database</li>
                  <li>• Read and learn from the content provided</li>
                  <li>• Share links to our content with others</li>
                  <li>• Contact us with questions or feedback</li>
                  <li>• Subscribe to our newsletter and updates</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">You May Not:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use the platform for any illegal or unauthorized purpose</li>
                  <li>• Reproduce, distribute, or commercially exploit our content without permission</li>
                  <li>• Attempt to gain unauthorized access to our systems</li>
                  <li>• Submit false, misleading, or harmful information</li>
                  <li>• Use our platform to provide medical advice to others</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Content and Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-primary" />
                <span>Content & Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The information provided on this platform is compiled from various sources and is intended for educational purposes. 
                While we strive for accuracy, we cannot guarantee that all information is complete, current, or error-free.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground">Sources</h4>
                  <p className="text-sm text-muted-foreground">Traditional medicine practices, scientific research, and peer-reviewed studies</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Updates</h4>
                  <p className="text-sm text-muted-foreground">We regularly review and update our content to maintain accuracy</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Individual Results</h4>
                  <p className="text-sm text-muted-foreground">Natural remedies may affect individuals differently</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liability Limitations */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Scale className="h-6 w-6 text-primary" />
                <span>Limitations of Liability</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by applicable law, Remedypedia shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, or any loss of profits or revenues.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• We are not responsible for the results of using any natural remedies</li>
                <li>• Users assume full responsibility for their health decisions</li>
                <li>• We recommend consulting healthcare professionals before trying new treatments</li>
                <li>• Individual results may vary significantly</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Links */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <ExternalLink className="h-6 w-6 text-primary" />
                <span>Third-Party Content & Links</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Our platform may contain links to third-party websites or reference external sources. We do not control 
                or endorse these external sites and are not responsible for their content or practices.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• External links are provided for convenience and reference only</li>
                <li>• We do not warrant the accuracy of third-party content</li>
                <li>• Third-party sites have their own terms and privacy policies</li>
                <li>• Use external resources at your own discretion</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Modifications to These Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting 
                on this page. Your continued use of the platform after any changes constitutes acceptance of the new terms.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We encourage you to review these terms periodically to stay informed of any updates.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-accent/30 border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Questions About These Terms?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions about these Terms of Use, please contact us. We're here to help clarify 
                any concerns you may have.
              </p>
              <p className="text-primary font-medium">legal@remedypedia.com</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;