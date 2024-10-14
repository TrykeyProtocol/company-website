import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/library/api/axios";
import toast from "react-hot-toast";
import { CustomToaster } from "../atoms/custom-toaster";
import Pagination from "./room-pagination";
import RoomFilter from "./room-filter";
import RoomGrid from "./room-grid";
import TransactionList from "./transaction-list";
import RoomModal from "./room-modal";
import { Room, Transaction } from "@/library/types/type";

interface PaymentFormData {
  email: string;
  name: string;
  phonenumber: string;
}

const AccessRooms: React.FC<{ assetName: string }> = ({ assetName }) => {
  const pathname = usePathname();
  const assetNumber = pathname?.split("/").pop();

  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
    email: "",
    name: "",
    phonenumber: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const roomsPerPage = 16;

  const queryClient = useQueryClient();

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
    setPaymentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const paymentMutation = useMutation({
    mutationFn: async (formData: PaymentFormData) => {
      if (!assetNumber || !selectedRoom)
        throw new Error("Asset number or room is undefined");
      const response = await axiosAuth.post("/payment/init/", {
        email: formData.email,
        name: formData.name,
        phonenumber: formData.phonenumber,
        amount: 5000.0,
        redirect_url: "localhost:8000/api/payment/verify",
        title: "Room Booking",
        description: `Payment for room ${selectedRoom.room_number} of Asset ${assetNumber}`,
        asset_number: assetNumber,
        sub_asset_number: selectedRoom.room_number,
        currency: "NGN",
        is_outgoing: false,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Payment initiated successfully:", data);
      toast.success("Payment initiated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["transactions", assetNumber],
      });
    },
    onError: (error: Error) => {
      console.error("Payment initiation failed:", error);
      toast.error(`Failed to initiate payment: ${error.message}`);
    },
  });

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    paymentMutation.mutate(paymentFormData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching rooms</div>;

  return (
    <div className="flex flex-col h-full overflow-scroll">
      <CustomToaster />
      <RoomFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {filteredRooms.length == 0 ? (
        <div className=" mb-8">No room to display</div>
      ) : (
        <RoomGrid
          rooms={currentRooms}
          onRoomClick={handleRoomClick}
          assetNumber={assetNumber}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalRooms={filteredRooms.length}
        roomsPerPage={roomsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <TransactionList
        transactions={transactions}
        isLoading={isLoadingTransactions}
        isError={isErrorTransactions}
      />
      {isModalOpen && selectedRoom && (
        <RoomModal
          room={selectedRoom}
          assetNumber={assetNumber}
          onClose={() => setIsModalOpen(false)}
          onControlRoom={handleRoomControl}
          controlMutation={controlMutation}
          paymentFormData={paymentFormData}
          handleInputChange={handleInputChange}
          handlePaymentSubmit={handlePaymentSubmit}
          paymentMutation={paymentMutation}
          assetName={assetName}
        />
      )}
    </div>
  );
};

export default AccessRooms;
