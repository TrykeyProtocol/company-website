import React, { useState } from "react";
import Image from "next/image";
import { Room } from "@/library/types/type";
import AssetActionButton from "../atoms/more-action-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/library/api/axios";
import toast from "react-hot-toast";
import AssetModal from "../organisms/asset-modal";
import DeleteModal from "../organisms/delete-modal";
import AddSubAssetModal from "./add-sub-asset-modal";

interface SubAssetFormData {
  room_number: string;
  room_type: string;
  price: number;
}

interface RoomGridProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
  assetNumber: string | undefined;
}

const RoomGrid: React.FC<RoomGridProps> = ({ rooms, onRoomClick, assetNumber }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<SubAssetFormData>({
    room_number: "",
    room_type: "",
    price: 0,
  });

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (updatedRoom: Partial<SubAssetFormData>) => {
      const { data } = await axiosAuth.patch(
        `/assets/${assetNumber}/rooms/${currentRoom?.room_number}/`,
        updatedRoom
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms", assetNumber] });
      setIsEditModalOpen(false);
      toast.success("Room edited successfully!");
    },
    onError: (error) => {
      console.error("Error editing room:", error);
      toast.error("Failed to edit room. Please try again.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => axiosAuth.delete(`/assets/${assetNumber}/rooms/${currentRoom?.room_number}/`),
    onSuccess: () => {
      toast.success("Room deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms", assetNumber] });
      setIsDeleteModalOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room. Please try again.");
    },
  });

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFields = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
    editMutation.mutate(updatedFields);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (room: Room) => {
    setCurrentRoom(room);
    setFormData({
      room_number: room.room_number,
      room_type: room.room_type,
      price: room.price || 0, 
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (room: Room) => {
    setCurrentRoom(room);
    setIsDeleteModalOpen(true);
  };

  const isOccupied = (occupancy: string | number): boolean => {
    return typeof occupancy === 'number' ? occupancy > 0 : parseInt(occupancy, 10) > 0;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 py-2.5 px-4 bg-lightMode-background-main dark:bg-darkMode-background-main rounded-3xl">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`flex rounded-full items-center ${
            room.status
              ? "bg-green-100 dark:bg-green-900"
              : "bg-yellow-50 dark:bg-yellow-800"
          } 
          ${
            isOccupied(room.occupancy)
              ? "border-2 border-blue-400 dark:border-blue-600"
              : "border-2 border-purple-400 dark:border-purple-600"
          }
          `}
        >
          <div
            className={`p-3 rounded-full flex items-center cursor-pointer flex-grow`}
            onClick={() => onRoomClick(room)}
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
                room.status ? "text-green-600" : "text-yellow-500"
              }`}
            >
              Room {room.room_number}
            </span>
          </div>
          <AssetActionButton
            onEdit={() => handleEdit(room)}
            onDelete={() => handleDelete(room)}
          />
        </div>
      ))}
      <AddSubAssetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={formData}
        handleInputChange={handleEditInputChange}
        handleSubmit={handleEditSubmit}
        isSubmitting={editMutation.isPending}
        isEditing={true}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        assetName={`Room ${currentRoom?.room_number}`}
        isSubmitting={deleteMutation.isPending}
      />
    </div>
  );
};

export default RoomGrid;

