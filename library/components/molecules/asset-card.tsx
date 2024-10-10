import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AssetCard: React.FC<{
  AssetName: string;
  NumberOfRooms: string;
  AssetType: string;
}> = ({ AssetName, NumberOfRooms, AssetType }) => {
  const getUrl = (assetType: string): string => {
    switch (assetType) {
      case "Hotel":
        return "/assets/hotel";
      case "Transport":
        return "/assets/transport";
      case "Logistics":
        return "/assets/logistics";
      default:
        return "/assets"; // Fallback URL if needed
    }
  };

  const getImage = (assetType: string): string => {
    switch (assetType) {
      case "Hotel":
        return "/images/dashboard/hotel/hotel.png";
      case "Transport":
        return "images/dashboard/hotel.png";
      case "Logistics":
        return "images/dashboard/hotel.png";
      default:
        return "/"; // Fallback image if needed
    }
  };

  const getAssetTypeLabel = (assetType: string): string => {
    switch (assetType) {
      case "Hotel":
        return "Hotel and Suites";
      case "Transport":
        return "Transportation";
      case "Logistics":
        return "Logistics";
      default:
        return "Asset";
    }
  };

  const getNumberLabel = (assetType: string): string => {
    switch (assetType) {
      case "Hotel":
        return "Number of rooms: ";
      case "Transport":
        return "Number of vehicles: ";
      case "Logistics":
        return "Number of logistics: ";
      default:
        return "Number: ";
    }
  };

  const url = getUrl(AssetType);
  const imageSrc = getImage(AssetType);

  return (
    <Link href={url}>
      <div
        className={`dark:bg-darkMode-background-alternate bg-lightMode-background-alternate rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
          AssetType === "Hotel"
            ? "border-purple-500 dark:border-purple-800"
            : AssetType === "Transport"
            ? "border-blue-500 dark:border-blue-800"
            : AssetType === "Logistics"
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