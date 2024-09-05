import axios from "axios";
import React, { useState } from "react";
import IssueAdd from "../IssueAdd/IssueAdd";
import IssueFilter from "../IssueFilter/IssueFilter";
import IssueList from "../IssueList/IssueList";
import "./Home.css";

function Home() {
  const [issues, setIssues] = useState({
    title: "",
    owner: "",
    status: "Open",
    createdOn: "2024-09-02",
    effortRequired: 0,
    dueDate: "2024-09-02",
  });
  const [issuesItems, setIssuesItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState(issuesItems);
  const [editableIssueId, setEditableIssueId] = useState(null);
  const [editedIssues, setEditedIssues] = useState({});
  const [showIssue, setShowIssue] = useState(false);
  const [messsage, setMessage] = useState("");

  const getDate = (date) => {
    if (!date) return "N/A";
    const currentDate = new Date(date);
    if (isNaN(currentDate)) return "Invalid Date";
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIssues = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://localhost:5000/createIssue",
        issues
      );
      console.log("Issue Created Successfully!", responce.data.issue);
      setIssuesItems((prev) => [...prev, responce.data.issue]);
      setShowIssue(false);
      setIssues("");
    } catch (error) {
      console.error("Error Created Issue", error);
    }
  };

  const handleChangeEditable = (e, issueId, field) => {
    setEditedIssues({
      ...editedIssues,
      [issueId]: {
        ...editedIssues[issueId],
        [field]: e.target.value,
      },
    });
  };

  const handleEdit = (issueId) => {
    setEditableIssueId(issueId);
    const issue = issuesItems.find((prev) => prev._id === issueId);
    setEditedIssues({
      ...editedIssues,
      [issueId]: {
        title: issue.title,
        owner: issue.owner,
        status: issue.status,
        effortRequired: issue.effortRequired,
        dueDate: getDate(issue.dueDate),
      },
    });
  };

  const handleSave = async (id) => {
    const updatedItem = editedIssues[id];
    console.log(updatedItem);
    try {
      const responce = await axios.put(
        `http://localhost:5000/edit/${id}`,
        updatedItem
      );
      console.log("Issue Updated SuccessFully", responce.data);
      setIssuesItems((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, ...updatedItem } : issue
        )
      );
      setEditableIssueId(null);
    } catch (error) {
      console.error("Error Updating issue: ", error);
    }
  };

  const handleNewIssue = () => {
    // navigate("/issue-add");
    setShowIssue(!showIssue);
  };

  const handleDeleteTask = async (id) => {
    console.log("deleted items is: ", id);

    try {
      const response = await axios.delete(`http://localhost:5000/delete/${id}`);
      console.log("The deletion issue is: ", response.data);
      const updatedItems = issuesItems.filter((prev) => prev._id !== id);
      console.log("Updated Items are: ", updatedItems);
      setIssuesItems(updatedItems);
    } catch (error) {
      console.error("Error Updating issue: ", error);
      setMessage(error.messsage);
    }
  };

  const handleFilterIssues = (searchText) => {
    if (searchText.trim() === "") {
      setFilteredItem(issuesItems);
    } else {
      const filtered = issuesItems.filter((issue) =>
        issue.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItem(filtered);
    }
  };

  return (
    <div className="issue-tracker-container">
      {/* Issue List */}
      <div className="issue-tracker-header">
        <h1 className="issue-tracker-title">Issue Tracker</h1>

        <IssueFilter
          issuesItems={filteredItem}
          setFilteredItem={handleFilterIssues}
          className="issue-filter"
        />

        <button onClick={handleNewIssue} className="issue-add-button">
          Add New Issue
        </button>
        {showIssue && (
          <IssueAdd
            issues={issues}
            handleChange={handleChange}
            onClick={handleAddIssues}
            className="issue-add-form"
          />
        )}
      </div>
      <IssueList
        issuesItems={filteredItem}
        setIssuesItems={setIssuesItems}
        handleEdit={handleEdit}
        handleSave={handleSave}
        editableIssueId={editableIssueId}
        editedIssues={editedIssues}
        getDate={getDate}
        handleChangeEditable={handleChangeEditable}
        handleDeleteTask={handleDeleteTask}
        className="issue-list"
      />
      {messsage && <p className="issue-message">{messsage}</p>}
    </div>
  );
}

export default Home;
