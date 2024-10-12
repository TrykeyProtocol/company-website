"use client";

import { axiosAuth } from "@/library/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpLeft,
  Power,
  PowerOff,
  Search,
  StepBack,
  StepForward,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CustomToaster } from "../atoms/custom-toaster";

interface Room {
  id: number;
  room_number: string;
  room_type: string;
  price: string;
  status: boolean;
  hotel: string;
  occupancy: number;
}

interface Transaction {
  name: string;
  amount: string;
  sub_asset_number: string;
  payment_status: string;
  date_time: string;
}

interface PaymentFormData {
  email: string;
  name: string;
  phonenumber: string;
}

const AccessRooms: React.FC = () => {
  const pathname = usePathname();
  const assetNumber = pathname?.split("/").pop();

  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
    email: '',
    name: '',
    phonenumber: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const roomsPerPage = 16;

  const {
    data: rooms,
    isLoading,
    isError,
  } = useQuery<Room[], Error>({
    queryKey: ["rooms", assetNumber],
    queryFn: async () => {
      const { data } = await axiosAuth.get<Room[]>(
        `/assets/${assetNumber}/rooms/`
      );
      return data;
    },
    enabled: !!assetNumber,
  });

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useQuery<Transaction[], Error>({
    queryKey: ["transactions", assetNumber],
    queryFn: async () => {
      const { data } = await axiosAuth.get<Transaction[]>(
        `/assets/${assetNumber}/transactions/`
      );
      return data;
    },
    enabled: !!assetNumber,
  });

  useEffect(() => {
    if (rooms) {
      const filtered = rooms.filter((room) => {
        const matchesSearch = room.room_number
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesFilter =
          activeFilter === "all" ||
          (activeFilter === "paid" && room.status) ||
          (activeFilter === "unpaid" && !room.status) ||
          (activeFilter === "occupied" && room.occupancy > 0) ||
          (activeFilter === "unoccupied" && room.occupancy === 0);
        return matchesSearch && matchesFilter;
      });
      setFilteredRooms(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, activeFilter, rooms]);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const controlMutation = useMutation({
    mutationFn: async ({
      roomNumber,
      action,
    }: {
      roomNumber: string;
      action: "turn_on" | "turn_off";
    }) => {
      if (!assetNumber) throw new Error("Asset number is undefined");

      const response = await axiosAuth.post(
        `/assets/${assetNumber}/control/${roomNumber}/`,
        {
          data: action,
          action_type: "electricity",
        }
      );

      if (
        response.data &&
        response.data.message === "Electricity control command sent."
      ) {
        return { success: true, roomNumber, action };
      } else {
        throw new Error("Unexpected response from server");
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        const actionText = data.action === "turn_on" ? "turn on" : "turn off";
        toast.success(
          `Request to ${actionText} Room ${data.roomNumber} was successful. Changes will take effect soon.`,
          {
            duration: 5000,
          }
        );
      }
    },
    onError: (error: Error) => {
      console.error("Control mutation error:", error);
      toast.error(
        `Failed to update room status: ${error.message}. Please try again.`,
        {
          duration: 5000,
        }
      );
    },
  });

  const handleRoomControl = (room: Room) => {
    if (!assetNumber) {
      console.error("Asset number is undefined");
      return;
    }
    const action = room.status ? "turn_off" : "turn_on";
    controlMutation.mutate({ roomNumber: room.room_number, action });
  };




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentFormData(prev => ({ ...prev, [name]: value }));
  };

  const paymentMutation = useMutation({
    mutationFn: async (formData: PaymentFormData) => {
      if (!assetNumber || !selectedRoom) throw new Error("Asset number or room is undefined");
      
      console.log("Sending payment request with data:", formData);
      
      const response = await axiosAuth.post<PaymentResponse>('/payment/init/', {
        email: formData.email,
        name: formData.name,
        phonenumber: formData.phonenumber,
        amount: 5000.00,
        redirect_url: "localhost:8000/api/payment/verify",
        title: "Room Booking",
        description: `Payment for room ${selectedRoom.room_number} of Asset ${assetNumber}`,
        asset_number: assetNumber,
        sub_asset_number: selectedRoom.room_number,
        currency: "NGN",
        is_outgoing: false
      });
      
      console.log("Received response:", response.data);
      
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Payment initiated successfully:", data);
      toast.success('Payment initiated successfully!');

    },
    onError: (error: Error) => {
      console.error("Payment initiation failed:", error);
      toast.error(`Failed to initiate payment: ${error.message}`);
    },
  });

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting payment form with data:", paymentFormData);
    paymentMutation.mutate(paymentFormData);
  };




  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching rooms</div>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <CustomToaster />

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
          {currentRooms.map((room) => (
            <div
              key={room.id}
              className={`p-3 rounded-full flex items-center cursor-pointer ${
                room.status
                  ? "bg-green-100 dark:bg-green-900"
                  : "bg-yellow-50 dark:bg-yellow-800"
              }`}
              onClick={() => handleRoomClick(room)}
            >
              <Image
                src={
                  room.status
                    ? "/images/dashboard/hotel/bed-paid.svg"
                    : "/images/dashboard/hotel/bed-unpaid.svg"
                }
                alt="Bed icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <span
                className={`font-semibold text-xs ${
                  room.status ? " text-green-600" : " text-yellow-500"
                }`}
              >
                Room {room.room_number}
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
          {isLoadingTransactions ? (
            <div>Loading transactions...</div>
          ) : isErrorTransactions ? (
            <div>Error loading transactions</div>
          ) : (
            <div className="grid grid-cols-[1fr,1fr,1fr,1fr,auto] gap-4 text-xs">
              <div className="font-semibold">Status</div>
              <div className="font-semibold">Name</div>
              <div className="font-semibold">Amount</div>
              <div className="font-semibold">Room</div>
              <div className="font-semibold">Date & Time</div>
              {transactions?.map((transaction, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center">
                    <div
                      className={`rounded-full w-5 h-5 flex items-center justify-center mr-2 ${
                        transaction.payment_status === "completed"
                          ? "bg-green-500"
                          : transaction.payment_status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      <ArrowUpLeft color="#FFFFFF" size={16} />
                    </div>
                    <span className="capitalize">
                      {transaction.payment_status}
                    </span>
                  </div>
                  <div>{transaction.name}</div>
                  <div>₦{parseFloat(transaction.amount).toLocaleString()}</div>
                  <div>{transaction.sub_asset_number}</div>
                  <div>{new Date(transaction.date_time).toLocaleString()}</div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedRoom && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className=" bg-lightMode-background-main dark:bg-darkMode-background-main p-8 rounded-3xl flex gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className=" md:flex items-center gap-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  Room {selectedRoom.room_number}
                </h2>
                <div className="flex gap-2 mb-4">
                  <span
                    className={`py-1 px-2 rounded-full text-xs ${
                      selectedRoom.status
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {selectedRoom.status ? "paid" : "unpaid"}
                  </span>
                  <span
                    className={`py-1 px-2 rounded-full text-xs ${
                      selectedRoom.occupancy > 0
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {selectedRoom.occupancy > 0 ? "occupied" : "unoccupied"}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <h3 className=" font-semibold mb-2">controls</h3>
                <button
                  className={`px-6 py-4 rounded-3xl h-[80px] flex items-center justify-center ${
                    selectedRoom.status
                      ? "bg-green-200 border-green-800 border"
                      : "bg-red-400 border-red-800"
                  } ${
                    controlMutation.isPending
                      ? "cursor-not-allowed opacity-40"
                      : ""
                  }`}
                  onClick={() => handleRoomControl(selectedRoom)}
                  disabled={controlMutation.isPending}
                >
                  {controlMutation.isPending ? (
                    <svg
                      className="animate-spin h-10 w-10 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : selectedRoom.status ? (
                    <Power color="#282828" width={40} height={40} />
                  ) : (
                    <PowerOff color="#282828" width={40} height={40} />
                  )}
                </button>
              </div>
              {controlMutation.isError && (
                <p className="text-red-500 mt-2">
                  Error updating room status. Please try again.
                </p>
              )}
            </div>

            <div className=" border-l border-gray-200 dark:border-gray-800 pl-3">
            <h2 className=" font-semibold mb-4">
                Payment for room {selectedRoom.room_number} of Asset {assetNumber}
              </h2>
              <form onSubmit={handlePaymentSubmit} className=" flex flex-col gap-8">
                <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
                  <label
                    htmlFor="email"
                    className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix"
                    placeholder="Enter Email"
                    value={paymentFormData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
                  <label
                    htmlFor="name"
                    className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix"
                    placeholder="Enter Name"
                    value={paymentFormData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
                  <label
                    htmlFor="phonenumber"
                    className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="tel"
                    required
                    className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix"
                    placeholder="Enter Phone Number"
                    value={paymentFormData.phonenumber}
                    onChange={handleInputChange}
                  />
                </div>


                <button
              type="submit"
              className="w-full h-[45px] md:h-[50px] bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text py-2 px-4 rounded-full focus:outline-none transition-colors duration-300 text-base dark:hover:bg-darkMode-button-background/90 hover:bg-lightMode-button-background/90 disabled:opacity-40 flex items-center justify-center font-bold"
              disabled={paymentMutation.isPending}
            >
              {paymentMutation.isPending && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Initiate Payment
            </button>


              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessRooms;
