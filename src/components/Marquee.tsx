import { motion } from "motion/react";

interface MarqueeProps {
  text: string;
  direction?: "left" | "right";
  speed?: number;
}

const Marquee = ({ text, direction = "left", speed = 30 }: MarqueeProps) => {
  const repeatedText = Array(6).fill(text).join(" — ");
  
  return (
    <div className="py-8 overflow-hidden relative">
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      {/* Glass strip background */}
      <div className="absolute inset-0 glass-subtle" />
      
      <motion.div 
        className="relative flex whitespace-nowrap"
        animate={{ 
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <span className="text-sm md:text-base uppercase tracking-[0.4em] text-primary/60 font-display">
          {repeatedText}
        </span>
        <span className="text-sm md:text-base uppercase tracking-[0.4em] text-primary/60 font-display ml-8">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
};

export default Marquee;
