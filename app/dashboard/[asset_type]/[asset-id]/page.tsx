"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MoreVertical,
  Plus,
  DoorOpen,
  Lightbulb,
  Unlock,
  Lock,
  LightbulbOff,
} from "lucide-react";
import { ThemeSwitch } from "@/library/components/atoms/theme-switch";
import DesktopNav from "@/library/components/molecules/desktop-nav";
import MobileNav from "@/library/components/molecules/mobile-nav";

const RoomDetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { asset_type, 'asset-id': assetId } = params;


  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [doorOpen, setDoorOpen] = useState(true);
  const [electricityOn, setElectricityOn] = useState(true);

  const navItems = [
    {
      icon: <ArrowLeft className="mr-2" />,
      label: "Dashboard",
      href: "/dashboard",
    },
  ];
  const toggleDoor = () => setDoorOpen(!doorOpen);
  const toggleElectricity = () => setElectricityOn(!electricityOn);

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightMode-background-secondary dark:bg-darkMode-background-secondary p-4 transition-colors duration-300">
      <div className="w-full max-w-7xl h-auto md:h-[80vh] bg-lightMode-background-main dark:bg-darkMode-background-main rounded-3xl overflow-hidden md:shadow-2xl flex flex-col md:flex-row transition-colors duration-300">
        <DesktopNav navItems={navItems} />
        <div className="w-full md:w-4/5 p-6 bg-lightMode-background-secondary dark:bg-darkMode-background-secondary">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 text-lightMode-text-main dark:text-darkMode-text-main"
              >
                <ArrowLeft />
              </button>
              <h1 className="text-2xl font-bold text-lightMode-text-heading dark:text-darkMode-text-heading">
                Room {assetId} Overview
              </h1>
            </div>
            <div className="flex items-center">
              <ThemeSwitch />
              <button className="ml-2 text-lightMode-text-main dark:text-darkMode-text-main">
                <Plus />
              </button>
              <Image
                src="/images/dashboard/pfp.png"
                alt="User Avatar"
                width={60}
                height={60}
                className="rounded-full w-[40px] h-[40px] md:w-[60px] md:h-[60px] ml-2"
              />
              <button
                className="md:hidden ml-2 text-lightMode-text-main dark:text-darkMode-text-main"
                onClick={() => setIsMobileNavOpen(true)}
              >
                <MoreVertical />
              </button>
            </div>
          </div>

          {/* Room Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-lightMode-text-heading dark:text-darkMode-text-heading">
              Status:{" "}
              <span className="text-lightMode-text-accent dark:text-darkMode-text-accent">
                Occupied
              </span>
            </h2>
          </div>

          {/* Room Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-6 rounded-2xl shadow-md">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col items-center gap-2">
                  <DoorOpen size={40} />
                  <h3 className="text-lg font-semibold">DOOR</h3>
                </div>
                <button className="text-lightMode-text-main dark:text-darkMode-text-main">
                  •••
                </button>
              </div>
              <p className="text-sm mb-4 text-lightMode-text-main dark:text-darkMode-text-main font-semibold">
                {doorOpen ? "Open" : "Closed"}
              </p>
              <div
                className={`p-8 w-2/3 h-40 rounded-2xl transition-colors duration-300 relative overflow-hidden cursor-pointer bg-lightMode-background-secondary dark:bg-darkMode-background-secondary text-lightMode-text-accent dark:text-darkMode-text-accent before:content-[''] before:absolute before:inset-0 before:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center`}
                onClick={toggleDoor}
              >
                {doorOpen ? (
                  <Unlock className="mx-auto" size={40} />
                ) : (
                  <Lock className="mx-auto" size={40} />
                )}
              </div>
            </div>
            <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-6 rounded-2xl shadow-md">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col items-center gap-2">
                  <Lightbulb size={40} />
                  <h3 className="text-lg font-semibold">ELECTRICITY</h3>
                </div>
                <button className="text-lightMode-text-main dark:text-darkMode-text-main">
                  •••
                </button>
              </div>
              <p className="text-sm mb-4 text-lightMode-text-main dark:text-darkMode-text-main font-semibold">
                {electricityOn ? "ON" : "OFF"}
              </p>
              <div
                className={`p-8 w-2/3 h-40 rounded-2xl transition-colors duration-300 relative overflow-hidden cursor-pointer bg-lightMode-background-secondary dark:bg-darkMode-background-secondary text-lightMode-text-accent dark:text-darkMode-text-accent before:content-[''] before:absolute before:inset-0 before:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center`}
                onClick={toggleElectricity}
              >
                {electricityOn ? (
                  <LightbulbOff className="mx-auto" size={40} />
                ) : (
                  <Lightbulb className="mx-auto" size={40} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        navItems={navItems}
      />
    </div>
  );
};

export default RoomDetailsPage;
