import React from "react";
import "./IssueAdd.css"; // Import the CSS file

function IssueAdd({ issues, handleChange, onClick }) {
  return (
    <div className="issue-add-container">
      <h3 className="issue-add-title">Add New Issue</h3>
      <div className="issue-add-form">
        <input
          type="text"
          value={issues.title}
          name="title"
          onChange={handleChange}
          placeholder="Title..."
          className="issue-add-input"
        />
        <input
          type="text"
          value={issues.owner}
          name="owner"
          onChange={handleChange}
          placeholder="Owner name..."
          className="issue-add-input"
        />
        <select
          name="status"
          value={issues.status}
          onChange={handleChange}
          className="issue-add-select"
        >
          <option value="">Select Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          type="date"
          value={issues.createdOn}
          name="createdOn"
          onChange={handleChange}
          className="issue-add-input"
          style={{ fontSize: "18px" }}
        />
        <input
          type="number"
          value={issues.effortRequired}
          name="effortRequired"
          onChange={handleChange}
          placeholder="Effort Required..."
          className="issue-add-input"
        />
        <input
          type="date"
          value={issues.dueDate}
          name="dueDate"
          onChange={handleChange}
          className="issue-add-input"
          style={{ fontSize: "18px" }}
        />
        <button onClick={onClick} className="issue-add-button">
          Add Issue
        </button>
      </div>
    </div>
  );
}

export default IssueAdd;
