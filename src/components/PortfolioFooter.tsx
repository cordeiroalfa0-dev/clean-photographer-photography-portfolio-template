import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Instagram, Mail, Phone } from "lucide-react";

const PortfolioFooter = () => {
  return (
    <footer className="relative border-t border-border/10 overflow-hidden">
      {/* Glass background */}
      <div className="absolute inset-0 glass-subtle" />
      
      {/* Large decorative text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          viewport={{ once: true }}
        >
          <span className="font-display text-[18vw] text-primary font-extralight">TATUAGENS STYLE</span>
        </motion.div>
      </div>
      
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="font-display text-3xl tracking-tight text-foreground hover:text-primary transition-colors duration-500 text-glow-subtle">
              Tatuagens Style
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Estúdio de tatuagem artística especializado em blackwork, fine line e realismo. Arte que marca para sempre.
            </p>
            
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/tatuagensstyle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-purple transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@tatuagensstyle.com.br"
                className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-purple transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+5511999887766"
                className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-purple transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              Portfólio
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                { to: "/category/selected", label: "Selecionados" },
                { to: "/category/commissioned", label: "Encomendados" },
                { to: "/category/editorial", label: "Editorial" },
                { to: "/category/personal", label: "Pessoal" },
              ].map((item) => (
                <Link 
                  key={item.to}
                  to={item.to} 
                  className="group text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit flex items-center gap-3"
                >
                  <span className="w-0 h-px bg-primary group-hover:w-6 transition-all duration-300" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              Contato
            </h4>
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <a
                href="mailto:contato@tatuagensstyle.com.br"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                contato@tatuagensstyle.com.br
              </a>
              <a
                href="tel:+5511999887766"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                +55 (11) 99988-7766
              </a>
              <a
                href="https://instagram.com/tatuagensstyle"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-primary hover:text-accent transition-colors duration-300"
              >
                @tatuagensstyle
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Tatuagens Style. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground/50 tracking-wider uppercase">
            São Paulo, Brasil
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
