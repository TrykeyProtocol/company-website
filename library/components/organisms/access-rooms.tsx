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
  nights: number;
}

interface RoomStatus {
  last_access_command: {
    command: string;
    timestamp: string;
  };
  last_electricity_command: {
    command: string;
    timestamp: string;
  };
  last_occupancy: {
    status: string;
    timestamp: string;
  };
}

const AccessRooms: React.FC<{ assetName: string }> = ({ assetName }) => {
  const pathname = usePathname();
  const assetNumber = pathname?.split("/").pop();

  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
    email: "",
    name: "",
    phonenumber: "",
    nights: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomStatus, setRoomStatus] = useState<RoomStatus | null>(null);
  const roomsPerPage = 16;
  const redirectURL = "https://dashboard.trykeyprotocol.com/api/payment/verify";
  const [paymentUrls, setPaymentUrls] = useState<{ [key: string]: string }>({});
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
        const occupancyNumber = parseInt(room.occupancy as string, 10);
        const matchesFilter =
          activeFilter === "all" ||
          (activeFilter === "paid" && room.status) ||
          (activeFilter === "unpaid" && !room.status) ||
          (activeFilter === "occupied" && occupancyNumber > 0) ||
          (activeFilter === "unoccupied" && occupancyNumber === 0);
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

  const handleRoomClick = async (room: Room) => {
    setSelectedRoom(room);
    if (assetNumber) {
      try {
        const { data } = await axiosAuth.get<RoomStatus>(
          `https://dashboard.trykeyprotocol.com/api/assets/${assetNumber}/status/${room.room_number}/`
        );
        setRoomStatus(data);
      } catch (error) {
        console.error("Error fetching room status:", error);
        toast.error("Failed to fetch room status");
      }
    }
    setIsModalOpen(true);
  };

  const controlMutation = useMutation({
    mutationFn: async ({
      roomNumber,
      action,
      actionType,
    }: {
      roomNumber: string;
      action: "turn_on" | "turn_off" | "unlock" | "lock";
      actionType: "electricity" | "access";
    }) => {
      if (!assetNumber) throw new Error("Asset number is undefined");
      const response = await axiosAuth.post(
        `/assets/${assetNumber}/direct_control/${roomNumber}/`,
        {
          data: action,
          action_type: actionType,
        }
      );
      if (response.data && response.data.message === "Control request sent and expiry scheduled") {
        return { 
          success: true, 
          roomNumber, 
          action, 
          actionType,
          expiryTime: response.data.expiry_time,
          expiryAction: response.data.expiry_data
        };
      } else {
        throw new Error("Unexpected response from server");
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        const actionText =
          data.action.includes("on") || data.action === "unlock"
            ? "activate"
            : "deactivate";
        toast.success(
          `Request to ${actionText} ${data.actionType} for Room ${data.roomNumber} was successful. Changes will take effect soon and expire at ${new Date(data.expiryTime).toLocaleString()}.`,
          {
            duration: 5000,
          }
        );
        // Refresh room status
        if (assetNumber && selectedRoom) {
          axiosAuth
            .get<RoomStatus>(
              `https://dashboard.trykeyprotocol.com/api/assets/${assetNumber}/status/${selectedRoom.room_number}/`
            )
            .then(({ data }) => setRoomStatus(data));
        }
      }
    },
    onError: (error: any) => {
      console.error("Control mutation error:", error);
      const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
      toast.error(
        `Failed to update room status: ${errorMessage}. Please try again.`,
        {
          duration: 5000,
        }
      );
    },
  });

  const handleRoomControl = (
    room: Room,
    actionType: "electricity" | "access"
  ) => {
    if (!assetNumber || !roomStatus) {
      console.error("Asset number or room status is undefined");
      return;
    }
    const currentStatus =
      actionType === "electricity"
        ? roomStatus.last_electricity_command.command
        : roomStatus.last_access_command.command;
    const action =
      currentStatus === "turn_on" || currentStatus === "unlock"
        ? actionType === "electricity"
          ? "turn_off"
          : "lock"
        : actionType === "electricity"
        ? "turn_on"
        : "unlock";
    controlMutation.mutate({
      roomNumber: room.room_number,
      action,
      actionType,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentFormData((prev) => ({
      ...prev,
      [name]: name === "nights" ? parseInt(value) : value,
    }));
  };

  const paymentMutation = useMutation({
    mutationFn: async (formData: PaymentFormData) => {
      if (!assetNumber || !selectedRoom)
        throw new Error("Asset number or room is undefined");
      const amount = formData.nights * selectedRoom.price;
      const response = await axiosAuth.post("/payment/init/", {
        email: formData.email,
        name: formData.name,
        phonenumber: formData.phonenumber,
        amount: amount,
        redirect_url: "https://dashboard.trykeyprotocol.com/api/payment/verify",
        title: "Room Booking",
        description: `Payment for room ${selectedRoom.room_number} of Asset ${assetNumber} for ${formData.nights} nights`,
        asset_number: assetNumber,
        sub_asset_number: selectedRoom.room_number,
        currency: "NGN",
        is_outgoing: false,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Payment initiated successfully:", data);
      setPaymentUrls(prev => ({
        ...prev,
        [selectedRoom!.room_number]: data.payment_link
      }));      toast.success("Payment initiated successfully!");
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
      {isModalOpen && selectedRoom && roomStatus && (
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
          roomStatus={roomStatus}
          redirectURL={paymentUrls[selectedRoom.room_number] || ""}
        />
      )}
    </div>
  );
};

export default AccessRooms;
