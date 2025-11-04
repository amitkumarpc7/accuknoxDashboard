import React from "react";
import { Menu, Search, BellRing, User } from "lucide-react";

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
              className="bg-transparent border-none outline-none text-sm w-32 lg:w-96"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button
            aria-label="Notifications"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <BellRing size={18} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={18} className="text-gray-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium hidden sm:inline">
              Amit Chaurasia
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
