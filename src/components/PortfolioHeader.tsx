import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import FocusTrap from "focus-trap-react";
import { motion } from "motion/react";

interface PortfolioHeaderProps {
  activeCategory: string;
}

const categories = [
  { key: "SELECTED", label: "Selecionados" },
  { key: "COMMISSIONED", label: "Encomendados" },
  { key: "EDITORIAL", label: "Editorial" },
  { key: "PERSONAL", label: "Pessoal" },
];

const PortfolioHeader = ({ activeCategory }: PortfolioHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-4' : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl md:text-2xl tracking-tight text-foreground hover:text-primary transition-colors duration-500 text-glow-subtle"
        >
          Tatuagens Style
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-3 glass-subtle rounded-full text-foreground/70 hover:text-foreground transition-colors"
          aria-label="Abrir menu de navegação"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {categories.map((category) => (
            <Link
              key={category.key}
              to={`/category/${category.key.toLowerCase()}`}
              className={`relative px-5 py-2.5 rounded-full text-sm tracking-wide transition-all duration-300 ${
                activeCategory === category.key
                  ? "glass text-primary glow-purple"
                  : "text-muted-foreground hover:text-foreground hover:glass-subtle"
              }`}
            >
              {category.label}
            </Link>
          ))}
          
          <div className="w-px h-6 bg-border/50 mx-2" />
          
          <Link
            to="/about"
            className="px-5 py-2.5 rounded-full text-sm tracking-wide text-muted-foreground hover:text-foreground hover:glass-subtle transition-all duration-300"
          >
            Sobre
          </Link>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <FocusTrap>
            <motion.div
              className="fixed inset-0 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navegação mobile"
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-graphite-950/95 backdrop-blur-xl" />
              
              {/* Close Button */}
              <div className="relative flex justify-end p-6">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 glass-subtle rounded-full text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Fechar menu de navegação"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="relative flex flex-col items-center justify-center gap-6 px-8 pt-12">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/category/${category.key.toLowerCase()}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-display text-4xl tracking-tight transition-all duration-300 ${
                        activeCategory === category.key
                          ? "text-primary text-glow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Separator - purple gradient line */}
                <motion.div 
                  className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent my-4"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.4 }}
                />

                {/* About Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-4xl tracking-tight text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    Sobre
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </FocusTrap>
        )}
      </div>
    </motion.header>
  );
};

export default PortfolioHeader;
