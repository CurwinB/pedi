import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Database, Cookie, UserCheck, Lock } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Privacy <span className="text-white font-bold drop-shadow-lg">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Your privacy is important to us. Learn how we protect and handle your information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Last Updated */}
          <div className="text-center">
            <p className="text-muted-foreground">Last updated: January 15, 2025</p>
          </div>

          {/* Overview */}
          <Card className="bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-primary" />
                <span>Privacy Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                At Remedypedia, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data when you use our natural health information platform.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in transparency and want you to feel confident about how your information is handled while using our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Database className="h-6 w-6 text-primary" />
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Information You Provide</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Search queries related to health conditions and natural remedies</li>
                  <li>• Contact information when you reach out to us</li>
                  <li>• Feedback and suggestions you submit</li>
                  <li>• Newsletter subscription email addresses</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Automatically Collected Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Website usage patterns and preferences</li>
                  <li>• Device information and browser type</li>
                  <li>• IP address and general location data</li>
                  <li>• Pages visited and time spent on our platform</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Eye className="h-6 w-6 text-primary" />
                <span>How We Use Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect for various purposes to provide, maintain, and improve our services:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>Improve our services:</strong> Enhance search results, user experience, and platform functionality</li>
                <li>• <strong>Provide relevant content:</strong> Deliver personalized information and recommendations tailored to your interests</li>
                <li>• <strong>Advertising:</strong> Display relevant advertisements through our advertising partners (you can opt out as described below)</li>
                <li>• <strong>Communicate with you:</strong> Respond to inquiries and send newsletters (with your explicit consent)</li>
                <li>• <strong>Platform security:</strong> Protect against spam, abuse, fraud, and security threats</li>
                <li>• <strong>Analytics:</strong> Understand how our platform is used to make data-driven improvements</li>
                <li>• <strong>Legal compliance:</strong> Meet our legal obligations and enforce our terms of service</li>
              </ul>
              
              <div className="bg-gray-50/50 border border-gray-200 rounded-lg p-4 dark:bg-gray-950/20 dark:border-gray-800 mt-4">
                <h4 className="font-medium text-foreground mb-2">Data Sharing</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We may share aggregated, non-personally identifiable information with third-party advertising partners 
                  to improve ad relevance and measure advertising effectiveness. We do not sell your personal information 
                  to third parties.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Lock className="h-6 w-6 text-primary" />
                <span>Data Protection & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Encrypted data transmission using SSL/TLS protocols</li>
                <li>• Secure server infrastructure and regular security updates</li>
                <li>• Limited access to personal data on a need-to-know basis</li>
                <li>• Regular security audits and vulnerability assessments</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies & Third-Party Advertising */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Cookie className="h-6 w-6 text-primary" />
                <span>Cookies & Third-Party Advertising</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, 
                and serve relevant advertisements. This includes partnerships with third-party advertising networks.
              </p>
              
              {/* Google Advertising Disclosure */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950/20 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Third-Party Advertising</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed mb-3">
                  <strong>Google and other third-party vendors use cookies to serve ads based on a user's prior visits to this website or other websites.</strong>
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                  These companies may collect information about your visits to this and other websites through cookies, 
                  web beacons, and other technologies to provide advertisements about goods and services that may be of interest to you.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground">Required for basic website functionality and security</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">Help us understand how visitors interact with our website and improve our services</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Advertising Cookies</h4>
                  <p className="text-sm text-muted-foreground">Used by third-party advertising networks to deliver relevant ads and measure ad performance</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Preference Cookies</h4>
                  <p className="text-sm text-muted-foreground">Remember your settings and preferences for a better user experience</p>
                </div>
              </div>
              
              {/* Opt-out Information */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-4 dark:bg-amber-950/20 dark:border-amber-800">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">How to Opt Out</h4>
                <div className="text-amber-700 dark:text-amber-300 text-sm space-y-2">
                  <p>You can control and opt out of personalized advertising through several methods:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Google Ad Settings:</strong> Visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">adssettings.google.com</a> to manage your Google advertising preferences</li>
                    <li><strong>NAI Opt-Out:</strong> Use the Network Advertising Initiative opt-out page at <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">optout.networkadvertising.org</a></li>
                    <li><strong>DAA Opt-Out:</strong> Visit the Digital Advertising Alliance opt-out page at <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">optout.aboutads.info</a></li>
                    <li><strong>Browser Settings:</strong> Configure your browser to block or delete cookies</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Note:</strong> Opting out of personalized advertising does not mean you will stop seeing ads entirely, 
                    but the ads you see may be less relevant to your interests.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <UserCheck className="h-6 w-6 text-primary" />
                <span>Your Rights & Choices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>Access:</strong> Request information about the personal data we hold about you</li>
                <li>• <strong>Correction:</strong> Ask us to correct any inaccurate personal information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                <li>• <strong>Data portability:</strong> Receive a copy of your data in a structured format</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-accent/30 border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Questions About This Policy?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or how we handle your personal information, 
                please don't hesitate to contact us.
              </p>
              <p className="text-primary font-medium">privacy@remedypedia.com</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;