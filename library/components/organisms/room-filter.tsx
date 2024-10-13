import React from "react";
import { Search } from "lucide-react";

interface RoomFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

type FilterKey = 'all' | 'paid' | 'unpaid' | 'occupied' | 'unoccupied';

type FilterStyles = {
  [key in FilterKey]: {
    active: string;
    inactive: string;
  }
};

const RoomFilter: React.FC<RoomFilterProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
}) => {
  const filterStyles: FilterStyles = {
    all: { active: "bg-gray-200 text-gray-800", inactive: "bg-gray-50 text-gray-500" },
    paid: { active: "bg-green-100 text-green-600", inactive: "bg-green-50 text-green-500" },
    unpaid: { active: "bg-yellow-100 text-yellow-600", inactive: "bg-yellow-50 text-yellow-500" },
    occupied: { active: "bg-blue-100 text-blue-600", inactive: "bg-blue-50 text-blue-400" },
    unoccupied: { active: "bg-purple-100 text-purple-600", inactive: "bg-purple-50 text-purple-400" },
  };

  return (
    <div className="lg:flex items-center lg:mb-8 mb-4 gap-4">
      <div className="flex gap-4 items-center mb-4 lg:mb-0">
        <h2 className="text-lg font-semibold">Access Rooms</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex border rounded-full p-2 px-3.5 gap-2"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[120px] rounded-full bg-transparent focus:outline-none"
          />
          <button type="submit">
            <Search />
          </button>
        </form>
      </div>

      <div className="flex gap-2">
        {(Object.keys(filterStyles) as FilterKey[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`py-1 text-xs rounded-full px-2 border ${
              activeFilter === filter
                ? filterStyles[filter].active
                : filterStyles[filter].inactive
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomFilter;