"use client";

import React, { useState } from "react";

const NewsLetterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted email:", email);
  };

  return (
    <section className="bg-lightMode-background-main dark:bg-darkMode-background-main py-16 md:py-24">
      <div className="container mx-auto  px-4 md:px-6 lg:px-8 flex justify-center">
        <div className=" py-4 md:py-8 lg:py-10 px-4 md:px-10 lg:px-16 rounded-xl bg-lightMode-background-alternate dark:bg-darkMode-background-alternate max-w-7xl flex flex-col lg:flex-row gap-10 items-start lg:items-end ">
          <div>
            <p className=" text-lightMode-text-accent dark:text-darkMode-text-accent mb-2 font-semibold">
              For the Top-Investors
            </p>
            <p className="text-2xl md:text-3xl font-bold text-lightMode-text-heading dark:text-darkMode-text-heading mb-6">
              Let trykey empower you with real-time data and intelligent
              automation.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-full bg-lightMode-background-main dark:bg-darkMode-background-main text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none focus:ring-2 focus:ring-lightMode-brand-accent dark:focus:ring-darkMode-brand-accent"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 lg:py-3 rounded-r-full bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text font-semibold hover:bg-lightMode-brand-accent dark:hover:bg-darkMode-brand-accent transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterSection;
