import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Cari..."
            className="border border-gray-300 rounded px-3 py-1 bg-slate-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200 w-full md:w-1/3"
        />
    );
};

export default SearchBar;
