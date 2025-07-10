import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import logo from "/lovable-uploads/123aadee-f061-4367-8c78-1a4ec06bf1d9.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-green-100 text-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <img 
                  src={logo} 
                  alt="Remedypedia Logo" 
                  className="h-32 lg:h-40 w-auto"
                />
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Your holistic guide to natural remedies and wellness. Discover evidence-based information 
                about traditional treatments and herbal medicine for a healthier, more natural lifestyle.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate("/")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigate("/blog")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Blog
                </button>
              </div>
            </div>

            {/* Support & Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About & Legal</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate("/about")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  About Us
                </button>
                <button 
                  onClick={() => navigate("/privacy")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => navigate("/terms")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Terms of Use
                </button>
                <button 
                  onClick={() => navigate("/contact")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Contact Us
                </button>
                <button 
                  onClick={() => navigate("/disclaimer")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Medical Disclaimer
                </button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-orange-600/20 rounded-xl p-6 mb-8 border border-orange-500/30">
            <div className="flex items-start space-x-3">
              <Leaf className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">Natural Health Disclaimer</h4>
                <p className="text-orange-700 text-sm leading-relaxed">
                  This platform provides information for educational purposes only about traditional and 
                  natural remedies. It is not a substitute for professional medical advice, diagnosis, or 
                  treatment. Always consult a licensed healthcare provider before using any natural remedy or 
                  making changes to your wellness routine.
                </p>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Remedypedia. All rights reserved. | Nurturing natural wellness through knowledge.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;