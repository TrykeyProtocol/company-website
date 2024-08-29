"use client";

import React from "react";
import { Coffee, Globe, Zap, Lightbulb, Star, User, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Coffee,
    title: "Anti-Tampering System",
    description: "Gain unmatched security with a tamper-evident design that discourages tampering attempts and detects unauthorized access."
  },
  {
    icon: Globe,
    title: "Improved Asset Utilization",
    description: "Real-time usage data helps you understand how your assets are being used. This allows you to optimize pricing models"
  },
  {
    icon: Star,
    title: "Remote Disablement",
    description: "The built-in actuator gives you ultimate control. In case of non-payment or security concerns, remotely disable the asset until payment is settled"
  },
  {
    icon: Lightbulb,
    title: "Reduced Operational Costs",
    description: "Eliminate the need for manual tracking, invoice processing, and chasing late payments, saving you time and money."
  },
  {
    icon: Zap,
    title: "Real Time Monitoring",
    description: "Know exactly where your assets are at all times and ensure you're always getting paid for their usage. This eliminates lost or stolen equipment and guarantees income for each use."
  },
  {
    icon: User,
    title: "Automated Billing",
    description: "Automatic billing based on sensor data removes the hassle of manual tracking and invoice generation. Get paid faster and focus on other important aspects of your business."
  }
];

interface FeatureCardProps extends Feature { }

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white dark:bg-darkMode-background-main p-6 rounded-lg drop-shadow flex flex-col items-center text-center h-full">
    <div className="bg-lightMode-background-alternate dark:bg-darkMode-brand-accent rounded-full w-16 h-16 flex items-center justify-center mb-4">
      <Icon className="dark:text-white text-lightMode-text-accent" size={32} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-lightMode-text-heading dark:text-darkMode-text-heading">{title}</h3>
    <p className="text-lightMode-text-main dark:text-darkMode-text-main">{description}</p>
  </div>
);

const UniquePropositionSection: React.FC = () => {
  return (
    <section className="bg-lightMode-background-alternate dark:bg-darkMode-background-alternate py-16 md:py-24">
      <div className="container mx-auto  px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-lightMode-text-heading dark:text-darkMode-text-heading">
          Our Unique Proposition
        </h2>
        <p className="text-center text-lightMode-text-main dark:text-darkMode-text-main mb-12 max-w-3xl mx-auto">
          Asset tracking should go beyond simple location tracking. At Trykey, we offer a comprehensive solution that empowers you and your business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniquePropositionSection;