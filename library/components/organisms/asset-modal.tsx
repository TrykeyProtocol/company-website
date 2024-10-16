import React from "react";
import { AssetFormData } from "@/library/types/type";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  formData: AssetFormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

const AssetModal: React.FC<ModalProps> = ({
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
        className="bg-lightMode-background-main dark:bg-darkMode-background-main p-8 max-w-md w-full rounded-3xl m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-2xl font-bold mb-10">
            {" "}
            {isEditing ? "Edit Asset" : "Add New Asset"}
          </h2>

          <form onSubmit={handleSubmit} className=" flex flex-col gap-8 ">
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
                Asset Type
              </label>
              <select
                name="asset_type"
                value={formData.asset_type}
                onChange={handleInputChange}
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
                required
              >
                <option value="vehicle">Vehicle</option>
                <option value="hotel">Hotel</option>
              </select>
            </div>
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
                Asset Name
              </label>
              <input
                type="text"
                name="asset_name"
                value={formData.asset_name}
                onChange={handleInputChange}
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
                required
              />
            </div>
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
                required
              />
            </div>
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-[30px] py-1 px-4">
              <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
                Details
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
                required
              />
            </div>
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                value={formData.account_number}
                onChange={handleInputChange}
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
                required
              />
            </div>
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading">
                Bank
              </label>
              <input
                type="text"
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm bg-transparent"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="w-full h-[45px] md:h-[50px] bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text py-2 px-4 rounded-full focus:outline-none transition-colors duration-300 text-base dark:hover:bg-darkMode-button-background/90 hover:bg-lightMode-button-background/90 disabled:opacity-40 flex items-center justify-center font-bold"
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
                {isEditing ? "Update Asset" : "Add Asset"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetModal;
