import { motion } from "framer-motion";

export function AnimatedBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-orange-50"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Animated Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-300 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-orange-300 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-300 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500 to-orange-500"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: "-10px",
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, Math.random() * 200 - 100],
            opacity: [particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
