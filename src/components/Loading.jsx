import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import AnimatedCircle from "./AnimatedCircle";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white p-4"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="fixed top-0 left-0 hidden md:block">
        <AnimatedCircle />
      </div>
      <div className="fixed top-0 right-0 hidden md:block">
        <AnimatedCircle />
      </div>
      <div className="fixed bottom-0 left-0 hidden md:block">
        <AnimatedCircle />
      </div>
      <div className="fixed bottom-[10%] right-[10%] hidden md:block">
        <AnimatedCircle />
      </div>
      <AnimatedCircle />
      <motion.div
        className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Wallet size={48} className="text-red-400" />
        </motion.div>
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          Personal Finance Visualizer
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
