"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OnboardingScreen = () => {
  const screens = [
    {
      title: "Assets management made easy",
      description:
        "Take control of your assets with a simple, streamlined solution. Manage, monitor, and optimize in one place!",
      image: "/images/onboarding/onboard-1.svg",
      buttonText: "Next",
    },
    {
      title: "Simplify Asset Management with Smart Technology",
      description:
        "Experience the future of asset management with features designed to save time, cut costs, and maximize efficiency.",
      image: "/images/onboarding/onboard-2.svg",
      buttonText: "Next",
    },
    {
      title: "Maximize Your Proof of Yield with Trykey",
      description:
        "Experience transparency and reliability with our Proof of Yield system, designed to ensure consistent and measurable returns.",
      image: "/images/onboarding/onboard-3.svg",
      buttonText: "Next",
    },
    {
      title: "Unmatched Security with Anti-Tampering Technology",
      description:
        "Protect your assets with our advanced Anti-Tampering System, designed to safeguard and detect unauthorized access.",
      image: "/images/onboarding/onboard-4.svg",
      buttonText: "Get Started",
    },
  ];

  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen((prev) => prev + 1);
    } else {
      router.push("/sign-up");
    }
  };

  const handleSkip = () => {
    router.push("/sign-up");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-white ">
      <div className="flex justify-between w-full">
        <button
          className="text-gray-500"
          hidden={currentScreen === 0}
          onClick={() => setCurrentScreen((prev) => prev - 1)}
        >
          Back
        </button>
        <button className="text-gray-500" onClick={handleSkip}>
          Skip
        </button>
      </div>
      <div className="flex flex-col items-center flex-1 mt-6">
        <div className="relative w-2/3 h-1/2">
          <Image
            src={screens[currentScreen].image}
            alt={screens[currentScreen].title}
            fill
            priority
            className="object-contain"
          />
        </div>{" "}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screens[currentScreen].title}
        </h1>
        <p className="mt-4 text-center text-slate-500 font-medium">
          {screens[currentScreen].description}
        </p>
        {/* Pagination Dots */}
        <div className="flex gap-2 mt-8">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentScreen
                  ? "bg-gray-500 w-4" // Active dot is wider and orange
                  : "bg-gray-300" // Inactive dots are gray
              }`}
              onClick={() => setCurrentScreen(index)}
              role="button"
              tabIndex={0}
            />
          ))}
        </div>
      </div>
      <button
        className="w-full py-3 mt-6 text-white bg-gray-800 rounded-lg hover:bg-gray-900"
        onClick={handleNext}
      >
        {screens[currentScreen].buttonText}
      </button>
    </div>
  );
};

export default OnboardingScreen;
