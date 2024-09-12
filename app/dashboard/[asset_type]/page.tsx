"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  MoreVertical,
  Home,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ThemeSwitch } from "@/library/components/atoms/theme-switch";
import DesktopNav from "@/library/components/molecules/desktop-nav";
import MobileNav from "@/library/components/molecules/mobile-nav";
import Logo from "@/library/components/atoms/logo";

// Room Card Component
const RoomCard: React.FC<{
  roomNumber: string;
  image: string;
  isOccupied: boolean;
  assetType: string;
}> = ({ roomNumber, image, isOccupied, assetType }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/${assetType}/${roomNumber}`);
  };

  return (
    <div 
      className="bg-white dark:bg-darkMode-background-main rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <Image
        src={image}
        alt={`Room ${roomNumber}`}
        width={300}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-lightMode-text-heading dark:text-darkMode-text-heading">
          Room {roomNumber}
        </h3>
        <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-main">
          {isOccupied ? "Occupied" : "Empty"}
          <span
            className={`ml-2 inline-block w-3 h-3 rounded-full ${
              isOccupied ? "bg-red-500" : "bg-green-500"
            }`}
          ></span>
        </p>
      </div>
    </div>
  );
};
const DetailedView: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const assetType = params.asset_type as string;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const capitalizedAssetType = assetType
    ? assetType.charAt(0).toUpperCase() + assetType.slice(1)
    : "Asset";

  // Mock data for rooms 
  const rooms = [
    {
      roomNumber: "301",
      image: "/images/dashboard/hotel.png",
      isOccupied: true,
    },
    {
      roomNumber: "303",
      image: "/images/dashboard/hotel.png",
      isOccupied: false,
    },
    {
      roomNumber: "305",
      image: "/images/dashboard/hotel.png",
      isOccupied: true,
    },
    {
      roomNumber: "307",
      image: "/images/dashboard/hotel.png",
      isOccupied: false,
    },
    {
      roomNumber: "309",
      image: "/images/dashboard/hotel.png",
      isOccupied: true,
    },
    {
      roomNumber: "311",
      image: "/images/dashboard/hotel.png",
      isOccupied: false,
    },
  ];

  const itemsPerPage = 3;
  const pageCount = Math.ceil(rooms.length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px is the default breakpoint for 'lg' in Tailwind
    };

    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1));
  };

  const displayedRooms = isLargeScreen
    ? rooms.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : rooms;

  const navItems = [
    { icon: <Home className="mr-2" />, label: "Dashboard", href: "/dashboard" },
    { icon: <Bell className="mr-2" />, label: "Notifications", href: "#" },
    { icon: <Settings className="mr-2" />, label: "Settings", href: "#" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightMode-background-secondary dark:bg-darkMode-background-secondary p-4 transition-colors duration-300">
      <div className="w-full max-w-7xl h-auto md:h-[80vh] bg-lightMode-background-main dark:bg-darkMode-background-main rounded-3xl overflow-hidden md:shadow-2xl flex flex-col md:flex-row transition-colors duration-300">
        <DesktopNav navItems={navItems} />
        <div className="w-full md:w-4/5 px-4 md:px-6 lg:px-8 py-4 bg-lightMode-background-secondary dark:bg-darkMode-background-secondary flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 text-lightMode-text-main dark:text-darkMode-text-main"
              >
                <ArrowLeft />
              </button>
              <div className="md:hidden mr-4">
                <Logo width={120} />
              </div>
              <h1 className="hidden md:block text-2xl font-bold text-lightMode-text-heading dark:text-darkMode-text-heading border-b-4 border-lightMode-text-accent dark:border-darkMode-text-accent">
                {capitalizedAssetType} Overview
              </h1>
            </div>
            <div className="flex items-center">
              <ThemeSwitch />
           
              <Image
                src="/images/dashboard/pfp.png"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full md:w-[60px] md:h-[60px]"
              />
              <button
                className="md:hidden ml-2 text-lightMode-text-main dark:text-darkMode-text-main"
                onClick={() => setIsMobileNavOpen(true)}
              >
                <MoreVertical />
              </button>
            </div>
          </div>

          {/* Room Grid with Pagination */}
          <div className="flex items-center justify-between mb-8">
            {isLargeScreen && (
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${
                  currentPage === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-lightMode-text-heading dark:text-darkMode-text-heading hover:bg-lightMode-background-main dark:hover:bg-darkMode-background-main"
                }`}
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow mx-4">
              {displayedRooms.map((room) => (
                <RoomCard assetType={capitalizedAssetType} key={room.roomNumber} {...room} />
              ))}
            </div>
            {isLargeScreen && (
              <button
                onClick={handleNextPage}
                disabled={currentPage === pageCount - 1}
                className={`p-2 rounded-full ${
                  currentPage === pageCount - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-lightMode-text-heading dark:text-darkMode-text-heading hover:bg-lightMode-background-main dark:hover:bg-darkMode-background-main"
                }`}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
          {/* General Information */}
          <div className="  flex flex-col w-full justify-center items-center">

          <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-6 rounded-2xl shadow-md w-[90%]">
            <h2 className="text-xl font-semibold mb-4 text-lightMode-text-heading dark:text-darkMode-text-heading pb-2 border-b border-lightMode-text-main dark:border-darkMode-text-main">
              General
            </h2>
            <div className="flex-grow border-t border-lightMode-background-main dark:border-darkMode-background-main w-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className=" md:flex flex-col items-center">
                <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-main">
                  Total No. of {capitalizedAssetType}s
                </p>
                <p className="text-2xl font-bold text-lightMode-text-heading dark:text-darkMode-text-heading">
                  87
                </p>
              </div>
              <div className=" md:flex flex-col items-center">
                <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-main">
                  No. of Occupied {capitalizedAssetType}s
                </p>
                <p className="text-2xl font-bold text-lightMode-text-heading dark:text-darkMode-text-heading">
                  50
                </p>
              </div>
              <div className=" md:flex flex-col items-center">
                <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-main">
                  Total Expected Yield
                </p>
                <p className="text-2xl font-bold text-lightMode-text-heading dark:text-darkMode-text-heading">
                  ₦48,000
                </p>
              </div>
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

export default DetailedView;
