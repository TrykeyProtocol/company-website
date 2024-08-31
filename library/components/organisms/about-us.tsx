"use client"
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Abdulmalik Adeyemo",
    role: "Chief Executive Officer",
    image: "/images/landing/team/Abdulmalik.jpg",
  },
  {
    name: "Favour Udofiah",
    role: "Chief Financial Officer",
    image: "/images/landing/team/favour.jpeg",
  },
  {
    name: "Mololuwa Adeniyi",
    role: "Chief Operations Officer",
    image: "/images/landing/team/Mololuwa.jpg",
  },
  {
    name: "Khalifa Shuaib",
    role: "Chief Technology Officer",
    image: "/images/landing/team/khalifa.jpg",
  },
];

const MemberCard: React.FC<TeamMember & { isExpanded: boolean; onClick: () => void }> = ({ name, role, image, isExpanded, onClick }) => (
  <motion.div
    className={`relative overflow-hidden cursor-pointer transition-all duration-300 ease-in-out rounded-[48px]
                ${isExpanded ? 'w-[40%]' : 'w-[15%]'} h-80`}
    onClick={onClick}
    layout
  >
    <Image
      src={image}
      alt={name}
      fill
      style={{ objectFit: "cover" }}
      className={`transition-all duration-300 ${isExpanded ? '' : 'grayscale'}`}
    />
    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-sm text-gray-300">{role}</p>
    </div>
  </motion.div>
);

const AboutUsSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const handleCardClick = (index: number) => {
    setExpandedIndex(index);
  };

  return (
    <section className="bg-lightMode-background-main dark:bg-darkMode-background-main py-16 md:py-24">
      <div className="container mx-auto  px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-lightMode-text-heading dark:text-darkMode-text-heading">
          About Us
        </h2>
        <p className="text-center text-lightMode-text-main dark:text-darkMode-text-main mb-12 max-w-3xl mx-auto">
          At TryKeyProtocol, we are passionate about bridging the gap between
          traditional infrastructure investment and the innovative world of
          Decentralized Finance (DeFi). We believe that everyone should have the
          opportunity to participate in the development of crucial infrastructure
          projects and earn attractive returns.
        </p>

        {/* Desktop View */}
        <div className="hidden lg:flex justify-center items-center space-x-4">
          {teamMembers.map((member, index) => (
            <MemberCard
              key={index}
              {...member}
              isExpanded={expandedIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative w-full aspect-square rounded-lg overflow-hidden h-[400px]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-xs text-gray-300">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;