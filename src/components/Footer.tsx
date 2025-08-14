import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">L</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-primary">Legacy Capital</h3>
                <p className="text-sm text-accent font-medium">NYC</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              New York's premier business funding company. We provide fast, transparent, 
              and flexible financing solutions to help businesses grow and thrive.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-foreground">(212) 555-FUND</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-foreground">funding@legacycapnyc.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-foreground">1 Wall Street, Suite 2000, New York, NY 10005</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Facebook className="w-5 h-5 text-accent" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Twitter className="w-5 h-5 text-accent" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Linkedin className="w-5 h-5 text-accent" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Instagram className="w-5 h-5 text-accent" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Merchant Cash Advance</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Revenue-Based Financing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Equipment Financing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Business Line of Credit</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Invoice Factoring</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">SBA Loan Alternative</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Our Process</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Legacy Capital NYC. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Disclosure</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Important:</strong> Legacy Capital NYC provides business funding solutions including merchant cash advances and other commercial financing products. 
            These products are not loans and have different terms and conditions. All funding is subject to credit approval and terms may vary. 
            Business must have been operating for at least 6 months with verifiable revenue to qualify. Rates and terms are determined based on 
            business performance, credit history, and other factors. This is a commercial transaction and not subject to personal credit laws.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;