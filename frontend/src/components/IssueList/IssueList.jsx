import axios from "axios";
import React, { useEffect, useState } from "react";
import "./IssueList.css";

function IssueList(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getIssue");
        console.log(response.data);
        props.setIssuesItems(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="loading-text">Loading....</p>;
  if (error) return <p className="error-text">Error: {error.message}</p>;

  return (
    <div className="issue-list-container">
      {props.issuesItems && props.issuesItems.length > 0 ? (
        props.issuesItems.map((issue) => (
          <div key={issue._id} className="issue-card">
            <h3 className="issue-title">
              Title
              <input
                type="text"
                className="issue-input issue-title-input"
                value={
                  props.editableIssueId === issue._id
                    ? props.editedIssues[issue._id]?.title || ""
                    : issue.title
                }
                onChange={(e) => {
                  props.handleChangeEditable(e, issue._id, "title");
                }}
                disabled={props.editableIssueId !== issue._id}
              />
            </h3>
            <p className="issue-owner">
              Owner:{" "}
              <input
                type="text"
                className="issue-input issue-owner-input"
                value={
                  props.editableIssueId === issue._id
                    ? props.editedIssues[issue._id]?.owner || ""
                    : issue.owner
                }
                onChange={(e) => {
                  props.handleChangeEditable(e, issue._id, "owner");
                }}
                disabled={props.editableIssueId !== issue._id}
              />
            </p>
            <p className="issue-status">
              Status:{" "}
              <select
                className="issue-select"
                value={
                  props.editableIssueId === issue._id
                    ? props.editedIssues[issue._id]?.status || ""
                    : issue.status
                }
                onChange={(e) => {
                  props.handleChangeEditable(e, issue._id, "status");
                }}
                disabled={props.editableIssueId !== issue._id}
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </p>
            <p className="issue-date">
              Created On:
              <input
                type="date"
                className="issue-input issue-date-input"
                value={props.getDate(issue.createdOn)}
                onChange={(e) => {
                  props.handleChangeEditable(e, issue._id, "date");
                }}
                disabled
              />
            </p>
            <p className="issue-effort">
              Effort Required:{" "}
              <input
                type="number"
                className="issue-input issue-effort-input"
                value={
                  props.editableIssueId === issue._id
                    ? props.editedIssues[issue._id]?.effortRequired || ""
                    : issue.effortRequired
                }
                onChange={(e) => {
                  props.handleChangeEditable(e, issue._id, "effortRequired");
                }}
                disabled={props.editableIssueId !== issue._id}
              />{" "}
              days
            </p>
            <p className="issue-due-date">
              Due Date:{" "}
              <input
                type="date"
                className="issue-input issue-due-date-input"
                value={
                  props.editableIssueId === issue._id
                    ? props.editedIssues[issue._id]?.dueDate || ""
                    : props.getDate(issue.dueDate) || "N/A"
                }
                onChange={(e) => {
                  props.handleChangeEditable(e, issue._id, "dueDate");
                }}
                disabled={props.editableIssueId !== issue._id}
              />
            </p>
            <div className="issue-buttons">
              {props.editableIssueId === issue._id ? (
                <button
                  className="issue-save-button"
                  onClick={() => {
                    props.handleSave(issue._id);
                  }}
                >
                  Save Task
                </button>
              ) : (
                <button
                  className="issue-edit-button"
                  onClick={() => {
                    props.handleEdit(issue._id);
                  }}
                >
                  Edit Task
                </button>
              )}
              <button
                className="issue-delete-button"
                onClick={() => {
                  props.handleDeleteTask(issue._id);
                }}
              >
                Delete Task
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-issues-text">No issues available</p>
      )}
    </div>
  );
}

export default IssueList;
