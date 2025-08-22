import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCalculatorOpen: () => void;
}

const Header = ({ onCalculatorOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/ac3ec563-6bc5-407a-9761-af39543d6a93.png" 
              alt="Legacy Capital NYC Logo" 
              className="h-42 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-accent transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-foreground hover:text-accent transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-foreground hover:text-accent transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-accent transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onCalculatorOpen}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculator
            </Button>
            <Button
              variant="premium"
              size="sm"
              onClick={() => scrollToSection('hero')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Get Funded
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass backdrop-blur-xl border-t border-border/50">
            <div className="container mx-auto px-6 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-foreground hover:text-accent transition-colors py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="block w-full text-left text-foreground hover:text-accent transition-colors py-2"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-foreground hover:text-accent transition-colors py-2"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-foreground hover:text-accent transition-colors py-2"
              >
                Contact
              </button>
              <div className="pt-4 border-t border-border/50 space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    onCalculatorOpen();
                    setIsMenuOpen(false);
                  }}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Funding Calculator
                </Button>
                <Button
                  variant="premium"
                  className="w-full"
                  onClick={() => {
                    scrollToSection('hero');
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