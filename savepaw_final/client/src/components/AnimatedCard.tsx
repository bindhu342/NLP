import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        y: -15,
        boxShadow: "0 30px 60px rgba(229, 9, 20, 0.3)",
        scale: 1.02
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedIcon({ children, className = "" }: AnimatedIconProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.2,
        rotate: 10,
        boxShadow: "0 0 30px rgba(229, 9, 20, 0.6)"
      }}
      animate={{ 
        y: [0, -5, 0],
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ children, className = "", delay = 0 }: AnimatedTextProps) {
  const words = children.split(" ");
  
  return (
    <motion.div className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + idx * 0.05 }}
          viewport={{ once: true }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
