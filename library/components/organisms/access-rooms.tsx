"use client";

import {
  ArrowUpLeft,
  Power,
  PowerOff,
  Search,
  StepBack,
  StepForward,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Sample data for rooms
const roomsData = [
  { name: "Room 1", paid: true, occupied: true },
  { name: "Room 2", paid: false, occupied: true },
  { name: "Room 3", paid: true, occupied: false },
  { name: "Room 4", paid: false, occupied: false },
  { name: "Room 5", paid: true, occupied: true },
  { name: "Room 6", paid: false, occupied: true },
  { name: "Room 7", paid: true, occupied: false },
  { name: "Room 8", paid: false, occupied: false },
  { name: "Room 9", paid: true, occupied: true },
  { name: "Room 10", paid: false, occupied: true },
  { name: "Room 11", paid: true, occupied: false },
  { name: "Room 12", paid: false, occupied: false },
  { name: "Room 13", paid: true, occupied: true },
  { name: "Room 14", paid: false, occupied: true },
  { name: "Room 15", paid: true, occupied: false },
  { name: "Room 16", paid: false, occupied: false },
  { name: "Room 9", paid: true, occupied: true },
  { name: "Room 10", paid: false, occupied: true },
  { name: "Room 11", paid: true, occupied: false },
  { name: "Room 12", paid: false, occupied: false },
  { name: "Room 13", paid: true, occupied: true },
  { name: "Room 14", paid: false, occupied: true },
  { name: "Room 15", paid: true, occupied: false },
  { name: "Room 16", paid: false, occupied: false },
];

// Sample data for transactions
const transactionsData = [
  { id: 1, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
  { id: 2, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
  { id: 3, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
  { id: 1, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
  { id: 2, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
  { id: 3, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
  { id: 1, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
  { id: 2, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
  { id: 3, amount: "2 Solana", value: "₦4,000", date: "Aug 4, 2024 21:42" },
];

const AccessRooms: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<null | {
    name: string;
    paid: boolean;
    occupied: boolean;
    controlOn: boolean;
  }>(null);
  const roomsPerPage = 16;

  useEffect(() => {
    const filtered = roomsData.filter((room) => {
      const matchesSearch = room.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "paid" && room.paid) ||
        (activeFilter === "unpaid" && !room.paid) ||
        (activeFilter === "occupied" && room.occupied) ||
        (activeFilter === "unoccupied" && !room.occupied);
      return matchesSearch && matchesFilter;
    });
    setFilteredRooms(filtered);
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handleRoomClick = (room: (typeof roomsData)[0]) => {
    setSelectedRoom({ ...room, controlOn: false });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="lg:flex items-center lg:mb-8 mb-4 gap-4">
        <div className="flex gap-4 items-center mb-4 lg:mb-0">
          <h2 className="text-lg font-semibold">Access Rooms</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border rounded-full p-2 px-3.5 gap-2"
          >
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[120px] rounded-full bg-transparent focus:outline-none"
            />
            <button type="submit">
              <Search />
            </button>
          </form>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`py-1 text-xs rounded-full px-2 border ${
              activeFilter === "all"
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-50 text-gray-500"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("paid")}
            className={`py-1 text-xs rounded-full px-2 border ${
              activeFilter === "paid"
                ? "bg-green-100 text-green-600"
                : "bg-green-50 text-green-500"
            }`}
          >
            paid
          </button>
          <button
            onClick={() => setActiveFilter("unpaid")}
            className={`py-1 text-xs rounded-full px-2 border ${
              activeFilter === "unpaid"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-yellow-50 text-yellow-500"
            }`}
          >
            unpaid
          </button>
          <button
            onClick={() => setActiveFilter("occupied")}
            className={`py-1 text-xs rounded-full px-2 border ${
              activeFilter === "occupied"
                ? "bg-blue-100 text-blue-600"
                : "bg-blue-50 text-blue-400"
            }`}
          >
            occupied
          </button>
          <button
            onClick={() => setActiveFilter("unoccupied")}
            className={`py-1 text-xs rounded-full px-2 border ${
              activeFilter === "unoccupied"
                ? "bg-purple-100 text-purple-600"
                : "bg-purple-50 text-purple-400"
            }`}
          >
            unoccupied
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 py-2.5 px-4 bg-lightMode-background-main dark:bg-darkMode-background-main rounded-3xl">
          {currentRooms.map((room, index) => (
            <div
              key={index}
              className={`p-4 rounded-full flex items-center cursor-pointer ${
                room.paid
                  ? "bg-green-100 dark:bg-green-900"
                  : "bg-yellow-50 dark:bg-yellow-800"
              }`}
              onClick={() => handleRoomClick(room)}
            >
              <Image
                src={
                  room.paid
                    ? "/images/dashboard/hotel/bed-paid.svg"
                    : "/images/dashboard/hotel/bed-unpaid.svg"
                }
                alt="Bed icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span
                className={`font-semibold text-sm ${
                  room.paid ? " text-green-600" : " text-yellow-500"
                }`}
              >
                {room.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 items-center mb-8">
          <p className="flex items-center">
            <span className="font-semibold">Rooms: {indexOfFirstRoom + 1}</span>
            <span className="text-xs">/{indexOfLastRoom}</span>
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10 rounded-xl"
            >
              <StepBack />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2.5 mr-4 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10 rounded-xl"
            >
              <StepForward />
            </button>
          </div>
        </div>

        <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-4 rounded-t-3xl">
          <h3 className="text-lg font-semibold mb-4">Transactions</h3>
          <div>
            {transactionsData.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex items-center">
                  <div className="bg-[#151515] rounded-full w-8 h-8 flex items-center justify-center mr-6">
                    <ArrowUpLeft color="#7F73FF" />
                  </div>
                  <div>
                    <div className="font-semibold">{transaction.amount}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.value}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"     onClick={() => setIsModalOpen(false)} 
>
          <div className=" bg-lightMode-background-main dark:bg-darkMode-background-main p-8 px-16 rounded-3xl"
                onClick={(e) => e.stopPropagation()}  

          >
            <div className=" md:flex items-center gap-6">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {selectedRoom.name}
              </h2>
              <div className="flex gap-2 mb-4">
                <span
                  className={`py-1 px-2 rounded-full text-xs ${
                    selectedRoom.paid
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {selectedRoom.paid ? "paid" : "unpaid"}
                </span>
                <span
                  className={`py-1 px-2 rounded-full text-xs ${
                    selectedRoom.occupied
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {selectedRoom.occupied ? "occupied" : "unoccupied"}
                </span>
              </div>
            </div>

            <div className=" mt-12 flex items-center gap-6">
              <h3 className="text-lg font-semibold mb-2">controls</h3>
              <button
                className={` px-8 py-4 rounded-3xl h-[100px] ${
                  selectedRoom.controlOn
                    ? "bg-green-200 border-green-800 border"
                    : "bg-red-400 border-red-800"
                }`}
                onClick={() =>
                  setSelectedRoom((prev) =>
                    prev ? { ...prev, controlOn: !prev.controlOn } : null
                  )
                }
              >
                {selectedRoom.controlOn ? (
                  <Power color="#282828" width={70} height={70} />
                ) : (
                  <PowerOff color="#282828" width={70} height={70} />
                )}
              </button>
            </div>
            {/* <button
              className="bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessRooms;
