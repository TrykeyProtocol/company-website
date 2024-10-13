import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AssetActionButton from "../atoms/more-action-button";
import { AssetFormData } from "@/library/types/type";
import AssetModal from "../organisms/asset-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/library/api/axios";
import toast from "react-hot-toast";
import DeleteModal from "../organisms/delete-modal";

type AssetType = "vehicle" | "hotel";

interface AssetCardProps {
  AssetName: string;
  NumberOfRooms: string;
  AssetType: AssetType;
  AssetNumber: string;
  location: string;
  details: string;
  account_number: string;
  bank: string;
}

const AssetCard: React.FC<AssetCardProps> = ({
  AssetName,
  NumberOfRooms,
  AssetType,
  AssetNumber,
  location,
  details,
  account_number,
  bank,
}) => {
  const [formData, setFormData] = useState<AssetFormData>({
    asset_type: AssetType,
    asset_name: AssetName,
    location,
    details,
    account_number,
    bank,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (newAsset: Partial<AssetFormData>) => {
      const { data } = await axiosAuth.patch(
        `/assets/${AssetNumber}/`,
        newAsset
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      setIsEditModalOpen(false);
      toast.success("Asset edited successfully!");
    },
    onError: (error) => {
      console.error("Error editing asset:", error);
      toast.error("Failed to edit asset. Please try again.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => axiosAuth.delete(`/assets/${AssetNumber}/`),
    onSuccess: () => {
      toast.success("Asset deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      setIsDeleteModalOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting asset:", error);
      toast.error("Failed to delete asset. Please try again.");
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const getUrl = (assetType: string, assetNumber: string): string => {
    switch (assetType.toLowerCase()) {
      case "hotel":
        return `/assets/hotel/${assetNumber}`;
      case "vehicle":
        return `/assets/transport/${assetNumber}`;
      case "logistics":
        return `/assets/logistics/${assetNumber}`;
      default:
        return `/assets/${assetNumber}`;
    }
  };

  const getImage = (assetType: string): string => {
    switch (assetType.toLowerCase()) {
      case "hotel":
        return "/images/dashboard/hotel/hotel.png";
      case "vehicle":
        return "/images/dashboard/vehicle/vehicle.jpg";
      case "logistics":
        return "/images/dashboard/hotel.png";
      default:
        return "/images/default-asset.png";
    }
  };

  const getAssetTypeLabel = (assetType: string): string => {
    switch (assetType.toLowerCase()) {
      case "hotel":
        return "Hotel and Suites";
      case "vehicle":
        return "Transportation";
      case "logistics":
        return "Logistics";
      default:
        return "Asset";
    }
  };

  const getNumberLabel = (assetType: string): string => {
    switch (assetType.toLowerCase()) {
      case "hotel":
        return "Number of rooms: ";
      case "vehicle":
        return "Number of vehicles: ";
      case "logistics":
        return "Number of logistics: ";
      default:
        return "Number: ";
    }
  };

  const url = getUrl(AssetType, AssetNumber);
  const imageSrc = getImage(AssetType);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`dark:bg-darkMode-background-alternate bg-lightMode-background-alternate rounded-2xl transition-transform duration-300 ${
        AssetType.toLowerCase() === "hotel"
          ? "border-purple-500 dark:border-purple-800"
          : AssetType.toLowerCase() === "vehicle"
          ? "border-blue-500 dark:border-blue-800"
          : AssetType.toLowerCase() === "logistics"
          ? "border-green-500 dark:border-green-800"
          : ""
      } border-l-4 px-6 py-4 flex flex-col gap-3`}
    >
      <p className="text-sm text-center">{getAssetTypeLabel(AssetType)}</p>
      <Link href={url} className="cursor-pointer">
        <Image
          src={imageSrc}
          alt={`${AssetType} ${AssetName}`}
          width={300}
          height={100}
          className="w-full h-32 object-cover rounded-3xl"
        />
      </Link>
      <div className="flex justify-between items-end">
        <Link href={url} className="cursor-pointer flex-grow">
          <div>
            <h3 className="font-bold text-lightMode-text-heading dark:text-darkMode-text-heading">
              <span className="font-light">Asset Name: </span>
              {AssetName}
            </h3>
            <h3 className="font-bold">
              <span className="font-light">{getNumberLabel(AssetType)}</span>
              {NumberOfRooms}
            </h3>
          </div>
        </Link>
        <div onClick={(e) => e.preventDefault()}>
          <AssetActionButton onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
      <AssetModal
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
        assetName={AssetName}
        isSubmitting={deleteMutation.isPending}

      />
    </div>
  );
};

export default AssetCard;
