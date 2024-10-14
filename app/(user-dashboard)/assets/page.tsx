"use client";
import { axiosAuth } from "@/library/api/axios";
import { CustomToaster } from "@/library/components/atoms/custom-toaster";
import AddAssetForm from "@/library/components/organisms/add-asset-form";
import AssetList from "@/library/components/organisms/asset-list";
import AssetModal from "@/library/components/organisms/asset-modal";
import AssetPagination from "@/library/components/organisms/asset-pagination";
import { Asset, AssetFormData, AssetsResponse } from "@/library/types/type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<AssetFormData>({
    asset_type: "vehicle",
    asset_name: "",
    location: "",
    details: "",
    account_number: "",
    bank: "",
  });

  const queryClient = useQueryClient();

  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery<Asset[], Error>({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axiosAuth.get<Asset[]>("/assets/");
      return data;
    },
  });

  const addAssetMutation = useMutation({
    mutationFn: async (newAsset: AssetFormData) => {
      const { data } = await axiosAuth.post<AssetsResponse>(
        "/assets/",
        newAsset
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      setIsModalOpen(false);
      toast.success("Asset added successfully!");
      setFormData({
        asset_type: "vehicle",
        asset_name: "",
        location: "",
        details: "",
        account_number: "",
        bank: "",
      });
    },
    onError: (error) => {
      console.error("Error adding asset:", error);
      toast.error("Failed to add asset. Please try again.");
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addAssetMutation.mutate(formData);
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
      <CustomToaster />

      <div className="flex justify-between mb-8 items-center">
        <div>
          <h2 className="text-xl font-semibold">Assets Overview</h2>
          <p className="text-lightMode-text-main dark:text-darkMode-text-main text-sm mt-3">
            Monitor and Track your assets
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-4 rounded-lg border border-lightMode-text-main flex items-center gap-2"
        >
          <p>Add Asset</p>
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        {isLargeScreen ? (
          <AssetPagination
            currentPage={currentPage}
            pageCount={pageCount}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            assets={displayedAssets}
          />
        ) : (
          <AssetList assets={displayedAssets} />
        )}
      </div>

      <AssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isSubmitting={addAssetMutation.isPending}
        isEditing={false}
      ></AssetModal>
    </div>
  );
};

export default Page;
