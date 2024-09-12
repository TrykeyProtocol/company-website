"use client";

import React, { useEffect, useRef, useState } from "react";
import { Home, Bell, Settings, ArrowLeft, MoreVertical, X } from "lucide-react";
import Image from "next/image";
import Logo from "@/library/components/atoms/logo";
import { ThemeSwitch } from "@/library/components/atoms/theme-switch";
import { useRouter } from "next/navigation";
import DesktopNav from "@/library/components/molecules/desktop-nav";
import MobileNav from "@/library/components/molecules/mobile-nav";

// Fake database
const fakeDB = [
  {
    id: 1,
    title: "Hotel",
    image: "/images/dashboard/hotel.png",
    count: 87,
    countLabel: "Number of rooms",
    subTitle: "Key hotel & Suites",
  },
  {
    id: 2,
    title: "Logistics",
    image: "/images/dashboard/vehicles.png",
    count: 50,
    countLabel: "Number of Vehicles",
    subTitle: "Key Travels",
  },
  {
    id: 3,
    title: "Real-Estate",
    image: "/images/dashboard/hotel.png",
    count: 120,
    countLabel: "Number of Properties",
    subTitle: "Key Properties",
  },
];

// Card Component
const Card: React.FC<{
  title: string;
  image: string;
  count: number;
  countLabel: string;
  subTitle: string;
}> = ({ title, image, count, countLabel, subTitle }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/${title.toLowerCase()}`);
  };

  return (
    <div 
      className="bg-lightMode-background-main dark:bg-darkMode-background-main rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-1">
        <h3 className="text-2xl font-bold text-lightMode-text-heading dark:text-darkMode-text-heading">
          {title}
        </h3>
        <p className="text-lightMode-text-main dark:text-darkMode-text-main font-semibold">
          {countLabel}: <span className="font-bold text-lightMode-text-heading dark:text-darkMode-text-heading">{count}</span>
        </p>
        <p className="text-lightMode-text-accent text-sm font-semibold dark:text-darkMode-text-accent">
          {subTitle}
        </p>
      </div>
    </div>
  );
};


const Dashboard = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { icon: <Home className="mr-2" />, label: 'Index', href: '#' },
    { icon: <Bell className="mr-2" />, label: 'Notifications', href: '#' },
    { icon: <Settings className="mr-2" />, label: 'Setting', href: '#' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightMode-background-secondary dark:bg-darkMode-background-secondary p-4 transition-colors duration-300">
      <div className="w-full max-w-7xl h-auto md:h-[80vh] bg-lightMode-background-main dark:bg-darkMode-background-main rounded-3xl overflow-hidden md:shadow-2xl flex flex-col md:flex-row transition-colors duration-300">
        {/* Desktop Sidebar */}
        <DesktopNav navItems={navItems} />

        {/* Main Content */}
        <div className="w-full md:w-4/5 p-6 bg-lightMode-background-secondary dark:bg-darkMode-background-secondary">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <button className="mr-4 text-lightMode-text-main dark:text-darkMode-text-main md:hidden">
                <ArrowLeft />
              </button>
              <div className="md:hidden">
                <Logo width={100} />
              </div>
              <h1 className="hidden md:block text-2xl font-bold text-lightMode-text-heading dark:text-darkMode-text-heading border-b-4 border-lightMode-text-accent dark:border-darkMode-text-accent">
                INDEX
              </h1>
            </div>
            <div className="flex items-center">
              <ThemeSwitch />
              <p className="mr-2 text-lightMode-text-main dark:text-darkMode-text-main">
                Good evening, Olu
              </p>
              <Image
                src="/images/dashboard/pfp.png"
                alt="User Avatar"
                width={60}
                height={60}
                className="rounded-full w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
              />
              <button 
                className="md:hidden ml-2 text-lightMode-text-main dark:text-darkMode-text-main"
                onClick={() => setIsMobileNavOpen(true)}
              >
                <MoreVertical />
              </button>
            </div>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fakeDB.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} navItems={navItems} />
    </div>
  );
};

export default Dashboard;