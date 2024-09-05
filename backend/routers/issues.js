const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issues");

router.get("/getIssue", issueController.getIssue);
router.post("/createIssue", issueController.postIssue);
router.put("/edit/:id", issueController.editIssue);
router.delete("/delete/:id", issueController.deleteIssue);
module.exports = router;
