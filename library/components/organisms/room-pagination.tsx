// Pagination.tsx
import React from 'react';
import { StepBack, StepForward } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  indexOfFirstRoom: number;
  indexOfLastRoom: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  indexOfFirstRoom,
  indexOfLastRoom,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center gap-4 items-center mb-8">
      <p className="flex items-center">
        <span className="font-semibold">Rooms: {indexOfFirstRoom + 1}</span>
        <span className="text-xs">/{indexOfLastRoom}</span>
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2.5 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10 rounded-xl"
        >
          <StepBack />
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2.5 mr-4 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10 rounded-xl"
        >
          <StepForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;