// AssetActionButton.tsx
import React, { useState } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';

interface AssetActionButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

const AssetActionButton: React.FC<AssetActionButtonProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full  hover:bg-gray-300/20"
      >
        <MoreVertical size={16} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 dark:bg-darkMode-background-main bg-lightMode-background-main rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg z-10 text-sm">
          <button 
            onClick={() => { onEdit(); setIsOpen(false); }}
            className="w-full text-left px-4 py-2  hover:bg-lightMode-brand-accent/10 flex items-center"
          >
            <Edit size={16} className="mr-2" /> Edit
          </button>
          <button 
            onClick={() => { onDelete(); setIsOpen(false); }}
            className="w-full text-left px-4 py-2 hover:bg-lightMode-brand-accent/10 flex items-center text-red-500"
          >
            <Trash size={16} className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetActionButton;