"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import AccessRooms from "@/library/components/organisms/access-rooms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/library/api/axios";
import LineGraph from "@/library/components/organisms/line-graph";
import AddSubAssetModal from "@/library/components/organisms/add-sub-asset-modal";
import { CustomToaster } from "@/library/components/atoms/custom-toaster";
import toast from "react-hot-toast";
import ManageUsersModal from "@/library/components/organisms/user-modal";
// import ManageUsersModal from "@/library/components/organisms/manage-users-modal";

interface Asset {
  asset_number: string;
  asset_type: string;
  asset_name: string;
  location: string;
  total_revenue: string;
  details: string;
  account_number: string;
  bank: string;
  user_role: string;
  sub_asset_count: number;
}

interface AssetStatus {
  total_rooms: number;
  total_active_rooms: number;
  total_occupied_rooms: number;
  expected_yield: number;
  daily_stats: {
    date: string;
    occupied_rooms: number;
    active_rooms: number;
    expected_yield: number;
  }[];
}

interface SubAssetFormData {
  room_number: string;
  room_type: string;
  price: number;
}

const Page = () => {
  const pathname = usePathname();
  const assetNumber = pathname?.split("/").pop();
  const [isSubAssetModalOpen, setIsSubAssetModalOpen] = useState(false);
  const [isManageUsersModalOpen, setIsManageUsersModalOpen] = useState(false);
  const [currentSubAsset, setCurrentSubAsset] = useState({
    room_number: "",
    room_type: "",
    price: 0,
  });

  const queryClient = useQueryClient();

  const addSubAssetMutation = useMutation({
    mutationFn: async (newSubAsset: SubAssetFormData) => {
      const { data } = await axiosAuth.post(
        `/assets/${assetNumber}/rooms/`,
        newSubAsset
      );
      return data;
    },
    onSuccess: () => {
      toast.success("asset created successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms", assetNumber] });
      setIsSubAssetModalOpen(false);
    },
    onError: (error) => {
      toast.error("error creating asset");
      console.error("Error adding sub-asset:", error);
    },
  });

  const handleSubAssetInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentSubAsset((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubAssetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSubAssetMutation.mutate(currentSubAsset);
  };

  const {
    data: assets,
    isLoading: assetsLoading,
    isError: assetsError,
  } = useQuery<Asset[], Error>({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axiosAuth.get<Asset[]>("/assets/");
      return data;
    },
  });

  const {
    data: assetStatus,
    isLoading: statusLoading,
    isError: statusError,
  } = useQuery<AssetStatus, Error>({
    queryKey: ["assetStatus", assetNumber],
    queryFn: async () => {
      const { data } = await axiosAuth.get<AssetStatus>(
        `/assets/${assetNumber}/status/`
      );
      return data;
    },
    enabled: !!assetNumber,
  });

  if (assetsLoading || statusLoading) return <div>Loading...</div>;
  if (assetsError || statusError) return <div>Error fetching data</div>;

  const assetData = assets?.find(
    (asset: Asset) => asset.asset_number === assetNumber
  );

  if (!assetData) {
    return <div>Asset not found</div>;
  }

  const generatedYield = parseFloat(assetData.total_revenue);
  const expectedYield = assetStatus?.expected_yield ?? 0;

  const percentage =
    expectedYield > 0 ? (generatedYield / expectedYield) * 100 : 0;

  return (
    <div className="lg:flex h-full">
      <CustomToaster />
      <div className="bg-lightMode-background-main dark:bg-darkMode-background-main border-r border-gray-200 dark:border-gray-800 lg:w-2/5 pt-8 px-8 lg:h-full flex flex-col gap-4">
        <div className="flex gap-5 items-center justify-between">
          <div className="rounded-2xl px-4 font-semibold py-3 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10 text-sm">
            Assets &gt;{" "}
            {assetData.asset_type.charAt(0).toUpperCase() +
              assetData.asset_type.slice(1)}
            s
          </div>
          {["admin", "manager"].includes(assetData.user_role) && (
            <button
              className="py-3 px-4 rounded-lg border border-lightMode-text-main flex items-center gap-2 text-sm"
              onClick={() => setIsManageUsersModalOpen(true)}
            >
              <p>Manage User</p>
            </button>
          )}

          <button
            className="py-3 px-4 rounded-lg border border-lightMode-text-main flex items-center gap-2 text-sm"
            onClick={() => setIsSubAssetModalOpen(true)}
          >
            <p>Add Room</p>
          </button>
        </div>
        <Image
          src="/images/dashboard/hotel/hotel.png"
          alt={assetData.asset_name}
          width={327}
          height={180}
          className="w-full rounded-3xl h-[180px]"
        />

        <div className="flex flex-col pt-2 items-center gap-2">
          <h1 className="text-lg font-semibold">{assetData.asset_name}</h1>

          {assetData.user_role == "admin" && (
            <div className="bg-lightMode-brand-primary/10 dark:bg-darkMode-brand-primary/10 flex flex-col gap-2.5 rounded-3xl w-full py-3 px-6 mx-3.5">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm">Yield Generated</p>
                  <p className="font-semibold">
                    ₦{generatedYield.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm">Expected Yield</p>
                  <p className="font-semibold">
                    ₦{expectedYield.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="relative w-full pt-5">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-lightMode-brand-accent dark:bg-darkMode-brand-accent rounded-l-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div
                  className="absolute top-0 text-xs font-semibold text-orange-500"
                  style={{
                    left: `${percentage}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {percentage.toFixed(0)}%
                </div>
              </div>
            </div>
          )}

          <div className="border-t-2 border-gray-200 dark:border-gray-800 w-full rounded-3xl h-64 pt-4 mt-6">
            <div className="flex justify-between px-5 pb-4">
              <p className="text-sm">Manage Utilities</p>
              <p className="text-sm">October </p>
            </div>
            {assetStatus && (
              <LineGraph
                data={assetStatus}
                xAxisDataKey="date"
                yAxisDataKey="occupied_rooms"
                xAxisLabel="Date"
                yAxisLabel="Occupied Rooms"
                areaColor="#f9733e"
                areaFillColor="#fcb091"
                totalRooms={assetStatus.total_rooms}
              />
            )}
            {/* <Graph /> */}
          </div>
        </div>
      </div>

      <div className="lg:w-3/5 pt-12 px-8">
        <AccessRooms assetName={assetData.asset_name} />
      </div>
      {assetNumber && (
        <>
          <AddSubAssetModal
            isOpen={isSubAssetModalOpen}
            onClose={() => setIsSubAssetModalOpen(false)}
            isEditing={false}
            formData={currentSubAsset}
            handleInputChange={handleSubAssetInputChange}
            handleSubmit={handleSubAssetSubmit}
            isSubmitting={addSubAssetMutation.isPending}
          />
          <ManageUsersModal
            isOpen={isManageUsersModalOpen}
            onClose={() => setIsManageUsersModalOpen(false)}
            assetNumber={assetNumber}
          />
        </>
      )}
    </div>
  );
};

export default Page;
