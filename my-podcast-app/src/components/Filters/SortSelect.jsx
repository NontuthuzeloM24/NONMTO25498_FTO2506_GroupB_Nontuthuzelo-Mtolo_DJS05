import React from "react";

/**
 * SortSelect component
 * Props:
 * - sortOrder: current sort order
 * - onChange: function(newSortOrder)
 */
export default function SortSelect({ sortOrder, onChange }) {
  return (
    <div className="sort-select">
      <label htmlFor="sort-select" className="sort-select__label">
        Sort:
      </label>
      <select
        id="sort-select"
        className="sort-select__select"
        value={sortOrder}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">None</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="updated-desc">Last Updated (Newest)</option>
        <option value="updated-asc">Last Updated (Oldest)</option>
      </select>
    </div>
  );
}
