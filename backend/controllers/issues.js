const Issues = require("../modals/issues");
const { StatusCodes } = require("http-status-codes");

exports.getIssue = async (req, res) => {
  try {
    const issue = await Issues.find();
    res.status(StatusCodes.ACCEPTED).json(issue);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Internet Server Error" });
  }
};

exports.postIssue = async (req, res) => {
  try {
    const { title, owner, status, createdOn, effortRequired, dueDate } =
      req.body;

    const newIssue = new Issues({
      title,
      owner,
      status,
      createdOn,
      effortRequired,
      dueDate,
    });

    await newIssue.save();
    res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "Issue Created SuccessFully", issue: newIssue });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Internet Server Error" });
  }
};

exports.editIssue = async (req, res) => {
  const { id } = req.params;
  const updatedDate = req.body;

  try {
    const updatedIssue = await Issues.findByIdAndUpdate(id, updatedDate, {
      new: true,
      runValidators: true,
    });

    if (!updatedIssue) {
      return res.status(StatusCodes.BAD_REQUEST).send("Issue not Found!");
    }

    res.status(StatusCodes.ACCEPTED).json(updatedIssue);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Error Updating Issue" });
  }
};

exports.deleteIssue = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedItem = await Issues.findByIdAndDelete(id);
    console.log("The Deleted Item is: ", deletedItem);

    if (!deletedItem) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Issue Not Found!" });
    }
    res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "Issue Deleted Successfully", deletedItem });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Error Deleting Issue" });
  }
};
