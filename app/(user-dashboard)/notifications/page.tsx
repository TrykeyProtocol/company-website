"use client"

import { motion } from 'framer-motion'
import React from 'react'
import Image from "next/image";


const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lightMode-background-main dark:bg-darkMode-background-main p-4">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <Image
          src="/coming-soon.svg"
          alt="Coming Soon"
          width={600}
          height={100}
          className="mx-auto w-full max-w-[600px] h-auto"
          priority
        />
      </motion.div>
      <p className="text-lg sm:text-xl md:text-2xl font-medium italic mb-8 text-lightMode-text-heading dark:text-darkMode-text-heading mt-10">
        Our devs are working hard.
      </p>
    </motion.div>
  </div>
  )
}

export default page