import { Link } from "react-router-dom";
import { motion } from "motion/react";

const PhotographerBio = () => {
  const nameLetters = "Ink Studio".split("");
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-gray-900/20 to-background pointer-events-none" />
      
      {/* Floating purple accent shapes */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-purple-glow/15 blur-2xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Year badge */}
          <motion.p 
            className="text-xs uppercase tracking-[0.4em] text-primary font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Portfólio 2024
          </motion.p>
          
          {/* Animated name */}
          <div className="overflow-hidden py-4">
            <motion.h1 
              className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] text-foreground accent-glow"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
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
          
          {/* Tagline with line reveal */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
              Estúdio de tatuagem especializado em{" "}
              <span className="text-primary font-medium">blackwork</span>,{" "}
              <span className="text-accent font-medium">fine line</span> e{" "}
              <span className="text-purple-light font-medium">realismo</span>.
              <br />
              <span className="text-foreground/80">Arte permanente que conta sua história.</span>
            </p>
          </motion.div>

          {/* CTA with elegant hover */}
          <motion.div 
            className="pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Link 
              to="/about" 
              className="group inline-flex items-center gap-4 text-sm uppercase tracking-[0.25em] text-foreground/70 hover:text-primary transition-all duration-500 font-display"
            >
              <span className="relative">
                Conheça nosso trabalho
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
              </span>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default PhotographerBio;
