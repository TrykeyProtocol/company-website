"use client";

import React from "react";
import Image from "next/image";
import Button from "../atoms/button";
import { motion } from "framer-motion";

const LandingSection: React.FC = () => {
  return (
    <section className="bg-lightMode-background-main dark:bg-darkMode-background-main text-lightMode-text-main dark:text-darkMode-text-main">
      <div className="container mx-auto  px-4 md:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="flex flex-col items-center justify-between gap-8 lg:gap-12">
          {/* Main Image with Animation */}
          <motion.div
            className="w-full relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/landing/tablet.png"
              alt="Trykey Dashboard"
              width={800}
              height={460}
              className="rounded-3xl w-full h-auto"
              priority
            />

            {/* Asset Icons */}
            {[
              {
                src: "/images/landing/printer.webp",
                alt: "Printer",
                position: "top-0 left-0",
              },
              {
                src: "/images/landing/tricycle.webp",
                alt: "Tricycle",
                position: "bottom-0 left-0",
              },
              {
                src: "/images/landing/sewing.jpg",
                alt: "Sewing Machine",
                position: "top-0 right-0",
              },
              {
                src: "/images/landing/generator.jpg",
                alt: "Generator",
                position: "bottom-0 right-0",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`absolute ${item.position} transform -translate-x-1/2 -translate-y-1/2 hidden lg:block`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.5 + index * 0.2,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <div className="w-[120px] h-[120px] rounded-full border-4 border-lightMode-brand-primary dark:border-darkMode-brand-accent overflow-hidden drop-shadow-[0_10px_30px_rgba(235,80,23,0.2)] relative">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full text-center lg:w-2/3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-lightMode-text-heading dark:text-darkMode-text-heading">
              Secure your investments with technology{" "}
              <span className="text-lightMode-text-accent dark:text-darkMode-text-accent italic">
                not prayers
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Cut unnecessary{" "}
              <span className="text-lightMode-text-accent dark:text-darkMode-text-accent">
                losses
              </span>{" "}
              and{" "}
              <span className="text-lightMode-text-accent dark:text-darkMode-text-accent">
                secure income
              </span>{" "}
              from your assets using Trykey&apos;s cutting-edge{" "}
              <span className="text-lightMode-text-accent dark:text-darkMode-text-accent">
                sensor-based
              </span>{" "}
              proof of yield system
            </p>

            <Button variant="primary" size="large" href="/login">
              Log In →
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
