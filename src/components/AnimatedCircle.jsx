import { motion } from "framer-motion";

const AnimatedCircle = ({ children }) => {
  return (
    <motion.div
      className="absolute w-60 h-60 bg-blue-700/50 rounded-full blur-3xl"
      animate={{
        x: [0, 100, -100, 0],
        y: [0, 80, -80, 0],
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCircle;
