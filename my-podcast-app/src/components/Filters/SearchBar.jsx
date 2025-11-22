import React from "react";

/**
 * SearchBar component
 * Props:
 * - searchTerm: current search term
 * - onChange: function(newTerm)
 */
export default function SearchBar({ searchTerm, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search shows..."
        className="search-bar__input"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
