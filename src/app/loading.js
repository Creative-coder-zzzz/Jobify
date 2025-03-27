"use client";


import React from 'react'
import { motion } from "framer-motion";
import { UserButton } from '@clerk/nextjs';

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-4 h-4 bg-blue-500 rounded-full"
          animate={{
            y: [0, -10, 0], 
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2, 
          }}
        />
      ))}
      
    </div>
  </div>
  )
}

export default Loading
