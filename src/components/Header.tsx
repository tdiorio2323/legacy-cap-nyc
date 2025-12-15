import { useState, useEffect } from 'react';
import { Menu, X, Phone, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const scrollToSection = (id: string) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //     setIsMenuOpen(false);
  //   }
  // };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-xl' : 'bg-background/80 backdrop-blur-sm border-b border-border/20'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        {/* Logo - Centered at Top */}
        <div className="flex justify-center mb-8">
          <a href="/" className="group" aria-label="Legacy Capital NYC home">
            <img
              src="/lcglogo.avif"
              alt="Legacy Capital NYC logo"
              className="h-32 w-auto rounded-md shadow-sm transition-transform duration-200 group-hover:scale-[1.01] cursor-pointer"
              width={128}
              height={128}
            />
          </a>
        </div>

        {/* Centered Navigation Bar */}
        <div className="flex items-center justify-center gap-8">
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-foreground hover:text-accent transition-colors text-sm tracking-luxury uppercase"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-foreground hover:text-accent transition-colors text-sm tracking-luxury uppercase"
            >
              Services
            </a>
            <a
              href="#process"
              className="text-foreground hover:text-accent transition-colors text-sm tracking-luxury uppercase"
            >
              Process
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-accent transition-colors text-sm tracking-luxury uppercase"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-accent transition-colors text-sm tracking-luxury uppercase"
            >
              Contact
            </a>

            {/* Social Links */}
            <div className="flex items-center space-x-3 ml-4 border-l border-white/10 pl-4">
              <a
                href="https://www.linkedin.com/company/legacy-capital-group-inc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-accent flex items-center justify-center text-white hover:bg-accent/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/legacycapnyc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-accent flex items-center justify-center text-white hover:bg-accent/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Desktop CTAs - All Gold Filled */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="premium"
              size="sm"
              onClick={() => {
                const element = document.getElementById('hero');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              Get Funded
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-black/90 border-t border-white/10 shadow-gold">
            <div className="container mx-auto px-6 py-6 space-y-4">
              <a
                href="/"
                className="block w-full text-left text-foreground font-medium hover:text-accent transition-colors py-3 tracking-luxury"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="block w-full text-left text-foreground font-medium hover:text-accent transition-colors py-3 tracking-luxury"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#process"
                className="block w-full text-left text-foreground font-medium hover:text-accent transition-colors py-3 tracking-luxury"
                onClick={() => setIsMenuOpen(false)}
              >
                Process
              </a>
              <a
                href="#testimonials"
                className="block w-full text-left text-foreground font-medium hover:text-accent transition-colors py-3 tracking-luxury"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="block w-full text-left text-foreground font-medium hover:text-accent transition-colors py-3 tracking-luxury"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Button
                  variant="premium"
                  className="w-full"
                  onClick={() => {
                    const hero = document.getElementById('hero');
                    hero?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Get Funded Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
