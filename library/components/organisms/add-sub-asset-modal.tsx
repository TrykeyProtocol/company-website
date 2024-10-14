// AddSubAssetModal.tsx
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/library/api/axios";
import toast from "react-hot-toast";

interface SubAssetFormData {
  room_number: string;
  room_type: string;
  price: number;
}

interface AddSubAssetModalProps {
  isOpen: boolean;
  onClose: () => void;

  formData: SubAssetFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

const AddSubAssetModal: React.FC<AddSubAssetModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className=" bg-lightMode-background-main dark:bg-darkMode-background-main p-8 rounded-3xl max-w-md w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200">
          {isEditing ? "Edit Asset" : "Add New Sub-Asset"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
            <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
              Room Number
            </label>
            <input
              type="text"
              name="room_number"
              value={formData.room_number}
              onChange={handleInputChange}
              className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
              required
            />
          </div>
          <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
            <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
              Room Type
            </label>
            <input
              type="text"
              name="room_type"
              value={formData.room_type}
              onChange={handleInputChange}
              className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
              required
            />
          </div>
          <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
            <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text hover:bg-lightMode-button-background/90 dark:hover:bg-darkMode-button-background/90 focus:outline-none focus:ring-2 focus:ring-lightMode-button-background dark:focus:ring-darkMode-button-background disabled:opacity-50 rounded-full flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting && (
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
            {isEditing ? "Edit Asset" : "Add Sub-Asset"}
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default AddSubAssetModal;
