import { Link } from "react-router-dom";
import { motion } from "motion/react";

const PortfolioFooter = () => {
  return (
    <footer className="relative border-t border-border/20 bg-secondary/30">
      {/* Large decorative text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          viewport={{ once: true }}
        >
          <span className="font-display text-[20vw] text-foreground">MARIA SILVA</span>
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
          <div className="space-y-5">
            <Link to="/" className="font-display text-3xl tracking-tight text-foreground hover:text-accent transition-colors duration-500">
              Maria Silva
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Fotógrafa de moda e produção visual baseada em São Paulo. Criando imagens que contam histórias únicas.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-accent">
              Portfólio
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: "/category/selected", label: "Selecionados" },
                { to: "/category/commissioned", label: "Encomendados" },
                { to: "/category/editorial", label: "Editorial" },
                { to: "/category/personal", label: "Pessoal" },
              ].map((item) => (
                <Link 
                  key={item.to}
                  to={item.to} 
                  className="group text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit flex items-center gap-2"
                >
                  <span className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-300" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-accent">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contato@mariasilva.com.br"
                className="group text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit flex items-center gap-2"
              >
                <span className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-300" />
                contato@mariasilva.com.br
              </a>
              <a
                href="tel:+5511999887766"
                className="group text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit flex items-center gap-2"
              >
                <span className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-300" />
                +55 (11) 99988-7766
              </a>
              <a
                href="https://instagram.com/mariasilva.foto"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit flex items-center gap-2"
              >
                <span className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-300" />
                @mariasilva.foto
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div 
          className="mt-20 pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Maria Silva. Todos os direitos reservados.
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