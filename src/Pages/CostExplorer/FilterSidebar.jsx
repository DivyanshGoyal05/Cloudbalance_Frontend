import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import "./FilterSidebar.css";

const FilterSidebar = ({
  columns,
  filterOptions,
  selectedFilters,
  onColumnClick,
  onCheckboxChange,
}) => {
  const [expandedColumns, setExpandedColumns] = useState({});

  const toggleColumn = (col) => {
    setExpandedColumns((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
    onColumnClick(col);
  };

  return (
    <div className="filter-sidebar">
      <h3>Filter by Columns</h3>
      <ul className="filter-column-list">
        {columns.map((col) => (
          <li key={col} className="filter-column-item">
            <div
              className={`filter-column-header ${
                expandedColumns[col] ? "active" : ""
              }`}
              onClick={() => toggleColumn(col)}
            >
              {col}
            </div>
            {expandedColumns[col] && filterOptions[col] && (
              <div className="filter-options">
                {filterOptions[col].map((val) => (
                  <div key={val} className="filter-option">
                    <Checkbox
                      checked={(selectedFilters[col] || []).includes(
                        val.toString()
                      )}
                      onClick={() => onCheckboxChange(col, val)}
                      size="small"
                    />
                    <label>{val}</label>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSidebar;
