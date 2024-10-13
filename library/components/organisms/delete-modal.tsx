import React, { useState, useEffect } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  assetName: string;
  isSubmitting: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  assetName,
  isSubmitting,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

  useEffect(() => {
    setInputValue("");
    setIsDeleteEnabled(false);
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDeleteEnabled(e.target.value.toLowerCase() === assetName.toLowerCase());
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-lightMode-background-main dark:bg-darkMode-background-main p-8 max-w-md w-full rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete the asset "{assetName}"? This action
          cannot be undone.
        </p>
        <p className="mb-2 text-sm">
          Please type <strong>{assetName}</strong> to confirm:
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 bg-transparent"
          placeholder={`Type "${assetName}" to confirm`}
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 w-1/2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-1/2 disabled:opacity-40 flex items-center justify-center"
            disabled={!isDeleteEnabled || isSubmitting}
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;