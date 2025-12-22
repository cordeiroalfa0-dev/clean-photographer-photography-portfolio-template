import { Link } from "react-router-dom";
import { motion } from "motion/react";

const PhotographerBio = () => {
  const nameLetters = "Tatuagens Style".split("");
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-mesh">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main purple orb */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(270 100% 50% / 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Secondary accent orb */}
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(280 100% 60% / 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Small floating orb */}
        <motion.div 
          className="absolute top-1/2 right-1/3 w-[200px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(285 100% 70% / 0.25) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ 
            y: [0, -40, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Year badge - glass style */}
          <motion.div 
            className="inline-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="glass-subtle px-6 py-2 rounded-full text-xs uppercase tracking-[0.4em] text-primary font-display">
              Portfólio 2024
            </span>
          </motion.div>
          
          {/* Animated name with glow */}
          <div className="overflow-hidden py-4">
            <motion.h1 
              className="font-display text-display-xl text-foreground text-glow"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          
          {/* Tagline in glass card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="glass-card inline-block px-10 py-8 rounded-2xl max-w-2xl mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                Estúdio especializado em{" "}
                <span className="text-primary font-medium text-glow-subtle">blackwork</span>,{" "}
                <span className="text-accent font-medium">fine line</span> e{" "}
                <span className="text-purple-neon font-medium">realismo</span>.
              </p>
              <p className="text-foreground/70 mt-4 text-base">
                Arte permanente que conta sua história.
              </p>
            </div>
          </motion.div>

          {/* CTA with glass button */}
          <motion.div 
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Link 
              to="/about" 
              className="group inline-flex items-center gap-4 glass-subtle px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-primary hover:glow-purple transition-all duration-500 font-display"
            >
              <span className="relative">
                Conheça nosso trabalho
              </span>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                className="group-hover:translate-x-2 transition-transform duration-500"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-8 h-14 rounded-full border border-primary/30 flex items-start justify-center p-2"
          style={{ boxShadow: '0 0 20px hsl(270 100% 65% / 0.2)' }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PhotographerBio;
