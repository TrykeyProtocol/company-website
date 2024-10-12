import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AssetCardProps {
  AssetName: string;
  NumberOfRooms: string;
  AssetType: string;
  AssetNumber: string;  // Add this prop
}

const AssetCard: React.FC<AssetCardProps> = ({ AssetName, NumberOfRooms, AssetType, AssetNumber }) => {
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
        return "/images/default-asset.png"; // Ensure you have a default image
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

  return (
    <Link href={url}>
      <div
        className={`dark:bg-darkMode-background-alternate bg-lightMode-background-alternate rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
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
        <Image
          src={imageSrc}
          alt={`${AssetType} ${AssetName}`}
          width={300}
          height={100}
          className="w-full h-32 object-cover rounded-3xl"
        />
        <div className="">
          <h3 className="font-bold text-lightMode-text-heading dark:text-darkMode-text-heading">
            <span className="font-light">Asset Name: </span>
            {AssetName}
          </h3>
          <h3 className="font-bold">
            <span className="font-light">{getNumberLabel(AssetType)}</span>
            {NumberOfRooms}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default AssetCard;