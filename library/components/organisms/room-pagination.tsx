// Pagination.tsx
import React from "react";
import { StepBack, StepForward } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalRooms: number;
  roomsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRooms,
  roomsPerPage,
  setCurrentPage,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalRooms / roomsPerPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalRooms === 0;
  const indexOfFirstRoom =
    totalRooms === 0 ? 0 : (currentPage - 1) * roomsPerPage + 1;


  return (
    <div className="flex justify-center gap-4 items-center mb-8">
      <p className="flex items-center">
        <span className="font-semibold">
          Rooms: {totalRooms === 0 ? "0" : indexOfFirstRoom}
        </span>
        <span className="text-xs">/{totalRooms}</span>
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={isFirstPage || totalRooms === 0}
          className={`p-2.5 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10 rounded-xl 
            ${
              isFirstPage || totalRooms === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-lightMode-button-background/20 dark:hover:bg-darkMode-button-background/20"
            }`}
        >
          <StepBack />
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={isLastPage || totalRooms === 0}
          className={`p-2.5 mr-4 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10 rounded-xl 
            ${
              isLastPage || totalRooms === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-lightMode-button-background/20 dark:hover:bg-darkMode-button-background/20"
            }`}
        >
          <StepForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
