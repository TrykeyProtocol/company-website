import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="bg-lightMode-background-main dark:bg-darkMode-background-main py-16 md:py-24">
      <div className="container mx-auto  px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-lightMode-text-heading dark:text-darkMode-text-heading">
          How it works
        </h2>

        <p className="text-center text-lightMode-text-main dark:text-darkMode-text-main mb-12 max-w-3xl mx-auto">
          Trykey helps its users monitor their infrastructures, it's a platform
          on both windows and Mac OS, that helps investors keep an eye on the
          yield output of their products (e.g cars, tricycle, bikes, buses,
          etc). You rest and let Trykey do all the work!
        </p>

        <div className="relative w-full pb-[56.25%]">
          <iframe
            src="https://www.youtube.com/embed/fdWlx5hECK4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
