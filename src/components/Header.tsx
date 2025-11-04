import React from "react";
import { Menu, Search } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Menu size={20} className="cursor-pointer text-gray-700" />
          <span className="text-sm text-gray-600 hidden sm:inline">
            Home &gt; <strong>Dashboard V2</strong>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent border-none outline-none text-sm w-32 lg:w-48"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
