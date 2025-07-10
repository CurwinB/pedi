import Header from "@/components/Header";
import { AlertTriangle, Shield, FileText, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow mb-6">
              <AlertTriangle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Medical Disclaimer</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Important information about the use of natural remedies and health content on Remedypedia
            </p>
          </div>

          {/* Main Disclaimer Card */}
          <Card className="bg-amber-50/50 border-amber-200 shadow-soft mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-800">
                <AlertTriangle className="h-6 w-6" />
                Remedypedia Does Not Provide Medical Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-amber-700">
              <p className="text-lg leading-relaxed">
                <strong>The content on Remedypedia is for informational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult a licensed healthcare provider before starting any treatment or natural remedy.</strong>
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-amber-800 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Informational Content Only
                  </h3>
                  <p className="text-sm leading-relaxed">
                    All information provided on this website is for educational and informational purposes only. 
                    It should not be considered as professional medical advice, diagnosis, or treatment recommendations.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-amber-800 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Consult Healthcare Providers
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Visitors should always consult a licensed healthcare provider before starting any remedy, 
                    treatment, or making changes to their health routine, especially if they have existing medical conditions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  No Medical Guarantees
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  No guarantees are made about the accuracy, completeness, or effectiveness of any remedy, 
                  treatment, or information mentioned on Remedypedia.
                </p>
                <p className="leading-relaxed">
                  Individual results may vary significantly, and what works for one person may not work for another. 
                  Natural remedies can have side effects and may interact with medications.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-500" />
                  Your Responsibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  You are responsible for your own health decisions. Always verify information with qualified 
                  healthcare professionals before implementing any health-related advice.
                </p>
                <p className="leading-relaxed">
                  If you are experiencing a medical emergency, contact your local emergency services immediately. 
                  Do not rely on information from this website for emergency medical situations.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Disclaimers */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Additional Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">FDA Statement</h3>
                <p className="leading-relaxed">
                  These statements have not been evaluated by the Food and Drug Administration. 
                  The remedies and information provided are not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Research and Sources</h3>
                <p className="leading-relaxed">
                  While we strive to provide information based on traditional use and available research, 
                  the scientific evidence for many natural remedies may be limited. Always consider the 
                  quality and source of information when making health decisions.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Medication Interactions</h3>
                <p className="leading-relaxed">
                  Natural remedies can interact with prescription medications, over-the-counter drugs, 
                  and other supplements. Always inform your healthcare provider about any natural remedies 
                  you are considering or currently using.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Special Populations</h3>
                <p className="leading-relaxed">
                  Pregnant women, nursing mothers, children, elderly individuals, and people with chronic 
                  health conditions should exercise extra caution and always consult healthcare providers 
                  before using any natural remedies.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;