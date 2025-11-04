import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => (
  <div className="mb-6">
    <input
      type="text"
      placeholder="Search widgets..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-2 border rounded w-full sm:w-1/2"
    />
  </div>
);

export default SearchBar;
