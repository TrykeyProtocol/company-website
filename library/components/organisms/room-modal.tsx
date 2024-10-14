import React from "react";
import { Power, PowerOff } from "lucide-react";
import { Room } from "@/library/types/type";

interface RoomModalProps {
  room: Room;
  assetNumber: string | undefined;
  onClose: () => void;
  onControlRoom: (room: Room) => void;
  controlMutation: {
    isPending: boolean;
    isError: boolean;
  };
  paymentFormData: {
    email: string;
    name: string;
    phonenumber: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  paymentMutation: {
    isPending: boolean;
  };
  assetName: string;
}

const RoomModal: React.FC<RoomModalProps> = ({
  room,
  assetNumber,
  onClose,
  onControlRoom,
  controlMutation,
  paymentFormData,
  handleInputChange,
  handlePaymentSubmit,
  paymentMutation,
  assetName,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-lightMode-background-main dark:bg-darkMode-background-main p-8 rounded-3xl m-4 max-w-3xl w-full  md:flex items-start gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Room details and control button */}
        <div className=" md:w-2/5 mb-6">
          <div className=" md:flex items-center gap-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Room {room.room_number}
            </h2>
            <div className="flex gap-2 mb-4">
              <span
                className={`py-1 px-2 rounded-full text-xs ${
                  room.status
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {room.status ? "paid" : "unpaid"}
              </span>
              <span
                className={`py-1 px-2 rounded-full text-xs ${
                  room.occupancy > 0
                    ? "bg-blue-100 text-blue-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {room.occupancy > 0 ? "occupied" : "unoccupied"}
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <h3 className="font-semibold mb-2">controls</h3>
            <button
              className={`px-6 py-4 rounded-3xl h-[80px] flex items-center justify-center ${
                room.status
                  ? "bg-green-200 border-green-800 border"
                  : "bg-red-400 border-red-800"
              } ${
                controlMutation.isPending ? "cursor-not-allowed opacity-40" : ""
              }`}
              onClick={() => onControlRoom(room)}
              disabled={controlMutation.isPending}
            >
              {controlMutation.isPending ? (
                <svg
                  className="animate-spin h-10 w-10 text-gray-500"
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
              ) : room.status ? (
                <Power color="#282828" width={40} height={40} />
              ) : (
                <PowerOff color="#282828" width={40} height={40} />
              )}
            </button>
          </div>
        </div>

        {/* Payment form */}
        <div className="md:border-l border-gray-200 dark:border-gray-800 pl-3 md:w-3/5">
          <h2 className="font-semibold mb-4">
            Payment for room {room.room_number}, {assetName}
          </h2>
          <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-8">
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label
                htmlFor="email"
                className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm"
                placeholder="Enter Email"
                value={paymentFormData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label
                htmlFor="name"
                className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm"
                placeholder="Enter Name"
                value={paymentFormData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative border border-lightMode-text-heading dark:border-darkMode-text-heading rounded-full py-1 px-4">
              <label
                htmlFor="phonenumber"
                className="absolute -top-2 left-6 bg-lightMode-background-main dark:bg-darkMode-background-main px-2 text-xs font-medium text-lightMode-text-heading dark:text-darkMode-text-heading"
              >
                Phone Number
              </label>
              <input
                id="phonenumber"
                name="phonenumber"
                type="tel"
                required
                className="w-full border-none text-lightMode-text-main dark:text-darkMode-text-main focus:outline-none px-0 py-1 placeholder-gray-400 autofill-fix text-sm placeholder:text-sm"
                placeholder="Enter Phone Number"
                value={paymentFormData.phonenumber}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="w-full h-[45px] md:h-[50px] bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text py-2 px-4 rounded-full focus:outline-none transition-colors duration-300 text-base dark:hover:bg-darkMode-button-background/90 hover:bg-lightMode-button-background/90 disabled:opacity-40 flex items-center justify-center font-bold"
              disabled={paymentMutation.isPending}
            >
              {paymentMutation.isPending && (
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
              Initiate Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
