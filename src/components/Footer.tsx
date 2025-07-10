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
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.164-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Natural Health Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Natural Health</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate("/")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigate("/search?category=herbal")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Herbal Remedies
                </button>
                <button 
                  onClick={() => navigate("/search?category=conditions")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Health Conditions
                </button>
                <button 
                  onClick={() => navigate("/blog")}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Wellness Blog
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