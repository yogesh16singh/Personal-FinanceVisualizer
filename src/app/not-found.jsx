"use client";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-900 p-4 text-white">
      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          opacity: { duration: 0.8 },
          y: { duration: 0.8 },
          scale: { repeat: Infinity, duration: 2 },
          rotate: { repeat: Infinity, duration: 2 },
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-lg mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: [1, 1.02, 1],
        }}
        transition={{
          opacity: { delay: 0.5, duration: 0.8 },
          scale: { repeat: Infinity, duration: 3 },
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.1, 1],
        }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          scale: { repeat: Infinity, duration: 2 },
        }}
      >
        <a
          href="/"
          className="bg-blue-500 cursor-pointer text-white px-6 py-3 rounded-2xl text-lg font-medium hover:bg-blue-400 transition"
        >
          Go Back Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
