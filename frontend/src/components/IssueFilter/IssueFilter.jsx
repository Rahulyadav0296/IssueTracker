import React, { useState } from "react";
import "./IssueFilter.css";
function IssueFilter(props) {
  const [search, setSearch] = useState("");
  console.log("Filtered Items are: ", props.issuesItems);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setFilteredItem(search);
  };
  return (
    <div className="issue-filter-container">
      <form onSubmit={handleSubmit} className="issue-filter-form">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="issue-filter-input"
          placeholder="Search Issues..."
        />
        <button type="submit" className="issue-filter-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default IssueFilter;
