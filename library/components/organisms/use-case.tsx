"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../atoms/button";
import { Check } from "lucide-react";

const images = [
  { src: "/images/landing/agric-usecase.png", alt: "agric usecase" },
  { src: "/images/landing/hotel-usecase.png", alt: "hotel usecase" },
  { src: "/images/landing/logistics-usecase.png", alt: "logistics usecase" },
  { src: "/images/landing/tricycle-usecase.png", alt: "tricycle usecase" },
];

const UseCasesSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-lightMode-background-main dark:bg-darkMode-background-main text-lightMode-text-main dark:text-darkMode-text-main py-16 md:py-24">
      <div className="container mx-auto  px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Carousel */}
          <motion.div
            className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImage].src}
                    alt={images[currentImage].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImage
                        ? "bg-lightMode-brand-accent dark:bg-darkMode-brand-accent w-4"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 order-2 lg:order-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-sm uppercase text-lightMode-text-accent dark:text-darkMode-text-accent font-semibold mb-2">
              USE CASES
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-lightMode-text-heading dark:text-darkMode-text-heading">
              Explore Real-World Applications of our Devices
            </h3>
            <p className="mb-8">
              Our Devices are designed to unlock a multitude of benefits across
              diverse industries:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Logistics & Transportation",
                "Healthcare & Medical Supplies",
                "Retail & Warehousing",
                "Construction & Manufacturing",
                "Rental & Leasing",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <Check className="w-5 h-5 text-lightMode-brand-accent dark:text-darkMode-brand-accent" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <Button variant="primary" size="large" href="/sign-up">
              Sign Up Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
