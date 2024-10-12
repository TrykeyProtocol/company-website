"use client";
import { axiosAuth } from "@/library/api/axios";
import AssetCard from "@/library/components/molecules/asset-card";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Asset {
  asset_number: string;
  asset_type: string;
  asset_name: string;
  location: string;
  created_at: string;
  total_revenue: string;
  details: string;
  account_number: string;
  bank: string;
  user_role: string;
  sub_asset_count: number;
}

type AssetsResponse = Asset[];

const Page = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch assets using React Query
  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery<AssetsResponse, Error>({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axiosAuth.get<AssetsResponse>("/assets/");
      return data;
    },
  });

  const itemsPerPage = 4;
  const pageCount = Array.isArray(assets)
    ? Math.ceil(assets.length / itemsPerPage)
    : 0;

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1));
  };

  const displayedAssets = Array.isArray(assets)
    ? isLargeScreen
      ? assets.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
        )
      : assets
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching assets</div>;

  return (
    <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-6 rounded-3xl shadow-2xl shadow-[#4c67641f] mt-12 mx-8">
      <div className="flex justify-between mb-8 items-center">
        <div>
          <h2 className="text-xl font-semibold">Assets Overview</h2>
          <p className="text-lightMode-text-main dark:text-darkMode-text-main text-sm mt-3">
            Monitor and Track your assets
          </p>
        </div>
        <button className="py-2.5 px-4 rounded-lg border border-lightMode-text-main flex items-center gap-2">
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
          {displayedAssets.map((asset: Asset) => (
            <AssetCard
              key={asset.asset_number}
              AssetType={asset.asset_type}
              AssetName={asset.asset_name}
              NumberOfRooms={asset.sub_asset_count.toString()}
              AssetNumber={asset.asset_number}
            />
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
