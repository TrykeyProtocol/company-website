import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import AssetList from './asset-list';
import { Asset } from '@/library/types/type';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  assets: Asset[];
}

const AssetPagination: React.FC<PaginationProps> = ({ currentPage, pageCount, handlePrevPage, handleNextPage, assets }) => (
  <div className="flex items-center justify-between w-full">
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
    <AssetList assets={assets} />
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
  </div>
);

export default AssetPagination;