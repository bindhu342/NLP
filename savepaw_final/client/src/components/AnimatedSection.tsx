import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  className = ""
}: AnimatedSectionProps) {
  const directionVariants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } }
  };

  return (
    <motion.div
      initial={directionVariants[direction].initial}
      whileInView={directionVariants[direction].animate}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export function FloatingElement({ children, duration = 3, className = "" }: FloatingElementProps) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface GlowPulseProps {
  children: ReactNode;
  className?: string;
}

export function GlowPulse({ children, className = "" }: GlowPulseProps) {
  return (
    <motion.div
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScaleOnHoverProps {
  children: ReactNode;
  className?: string;
}

export function ScaleOnHover({ children, className = "" }: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
