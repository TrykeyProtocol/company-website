"use client";
import AssetCard from "@/library/components/molecules/asset-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const rooms = [
    {
      AssetType: "Hotel",
      AssetName: "Azure Oasis Hotel",
      image: "/images/dashboard/hotel.png",
      NumberOfRooms: "100",
    },
    {
      AssetType: "Hotel",
      AssetName: "The Grand Vista",
      image: "/images/dashboard/hotel.png",
      NumberOfRooms: "100",
    },
    {
      AssetType: "Hotel",
      AssetName: "Lumiere Suites",
      image: "/images/dashboard/hotel.png",
      NumberOfRooms: "100",
    },
    {
      AssetType: "Hotel",
      AssetName: "Oceanus Resort",
      image: "/images/dashboard/hotel.png",
      NumberOfRooms: "100",
    },
    {
      AssetType: "Hotel",
      AssetName: "The Kensington Hotel",
      image: "/images/dashboard/hotel.png",
      NumberOfRooms: "100",
    },
    {
      AssetType: "Hotel",
      AssetName: "Skyline Towers Hotel",
      image: "/images/dashboard/hotel.png",
      NumberOfRooms: "100",
    },
    {
      AssetType: "Hotel",
      AssetName: "Aurora Palace",
      image: "/images/dashboard/hotel.png",
      NumberOfRooms: "100",
    },
  ];

  const itemsPerPage = 4;
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

  return (
    <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-6 rounded-3xl shadow-2xl shadow-[#4c67641f] mt-12 mx-8">
      <div className=" flex justify-between mb-8 items-center">
        <div>
          <h2 className="text-xl font-semibold">Assets Overview</h2>
          <p className=" text-lightMode-text-main dark:text-darkMode-text-main text-sm mt-3">
            Monitor and Track your assets
          </p>
        </div>
        <button className=" py-2.5 px-4 rounded-lg border border-lightMode-text-main flex items-center gap-2">
          <p>Add Assets</p>
        </button>
      </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow mx-4 lg:gap-16">
          {displayedRooms.map((room) => (
            <AssetCard key={room.AssetName} {...room} />
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
    </div>
  );
};

export default Page;

