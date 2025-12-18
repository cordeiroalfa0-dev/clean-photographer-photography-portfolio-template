import { motion } from "motion/react";

interface MarqueeProps {
  text: string;
  direction?: "left" | "right";
  speed?: number;
}

const Marquee = ({ text, direction = "left", speed = 30 }: MarqueeProps) => {
  const repeatedText = Array(6).fill(text).join(" — ");
  
  return (
    <div className="py-6 border-t border-border/30 overflow-hidden bg-secondary/30">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ 
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <span className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground font-display">
          {repeatedText}
        </span>
        <span className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground font-display ml-8">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
};

export default Marquee;
