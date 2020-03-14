const router = require("express").Router();
const auth = require("../middleware/verifyToken");
let Issue = require("../models/issue.model");

// @route GET /issue
// @desc get issues
// @access Public
router.get("/", (req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route GET /issue/closed
// @desc get closed issues
// @access Public
router.get("/closed", (req, res) => {
  Issue.find({ status: "Closed" })
    .sort({ updatedAt: -1 })
    .limit(5)
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route GET /issue/:id
// @desc get issue by id
// @access Public
router.get("/:id", (req, res) => {
  Issue.findById(req.params.id)
    .then(issue => res.json(issue))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST issue/add
// @desc create an issue
// @access Private
router.post("/add", auth, (req, res) => {
  const issueTitle = req.body.issueTitle;
  const name = req.body.name;
  const issueDescription = req.body.issueDescription;
  const date = req.body.date;
  const number = req.body.number;
  const issueLog = req.body.issueLog;
  const assignedTo = req.body.assignedTo;
  const status = req.body.status;
  const projectTitle = req.body.projectTitle;

  const newIssue = new Issue({
    name,
    issueDescription,
    date,
    number,
    issueTitle,
    issueLog,
    assignedTo,
    status,
    projectTitle
  });

  newIssue
    .save()
    .then(() => res.json("Issue added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// /issue/update/:id + post request
// currently all fields are required, can update so that you can update a single field without and error
router.route("/update/:id").post((req, res) => {
  Issue.findById(req.params.id)
    .then(issue => {
      issue.name = req.body.name;
      issue.issueDescription = req.body.issueDescription;
      issue.issueLog = req.body.issueLog;
      issue.date = req.body.date;
      issue.number = req.body.number;
      issue.issueTitle = req.body.issueTitle;
      issue.assignedTo = req.body.assignedTo;
      issue.status = req.body.status;

      issue
        .save()
        .then(() => res.json("Issue updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// @route DELETE issue/:id
// @desc delete an issue
// @access Public
router.delete("/:id", (req, res) => {
  Issue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Issue deleted."))
    .catch(err => res.status(404).json("Error: " + err));
});

// @route GET /issue/search/:initiatedBy
// @desc get issues based on initiatedBy
// @access Public
router.get("/search/initiatedBy/:initiatedBy", (req, res) => {
  const initiatedBy = req.query.initiatedBy;

  Issue.find({ name: req.params.initiatedBy })
    .then(issue => res.json(issue))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route GET /issue/search/:assignedTo
// @desc get issues based on assignedTo
// @access Public
router.get("/search/assignedTo/:assignedTo", (req, res) => {
  const assignedTo = req.params.assignedTo;
  //mongoose command
  Issue.find({ assignedTo: req.params.assignedTo })
    .then(issue => res.json(issue))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route GET /issue/search/:initiatedBy
// @desc get issues based on initiatedBy
// @access Public
router.get(
  "/search/initiatedBy/:initiatedBy/assignedTo/:assignedTo",
  (req, res) => {
    Issue.find({
      name: req.params.initiatedBy,
      assignedTo: req.params.assignedTo
    })
      .then(issue => res.json(issue))
      .catch(err => res.status(400).json("Error: " + err));
  }
);

// date range
router.get("/search/dtStart/:dtStart/dtEnd/:dtEnd", (req, res) => {
  Issue.find({
    createdAt: { $gte: req.params.dtStart, $lte: req.params.dtEnd }
  })
    .then(issue => res.json(issue))
    .catch(err => res.status(400).json("Error: " + err));
});

// all route
router.get(
  "/search/initiatedBy/:initiatedBy/assignedTo/:assignedTo/dtStart/:dtStart/dtEnd/:dtEnd",
  (req, res) => {
    Issue.find({
      name: req.params.initiatedBy,
      assignedTo: req.params.assignedTo,
      createdAt: { $gte: req.params.dtStart, $lte: req.params.dtEnd }
    })
      .then(issue => res.json(issue))
      .catch(err => res.status(400).json("Error: " + err));
  }
);

// assign + dates
router.get(
  "/search/assignedTo/:assignedTo/dtStart/:dtStart/dtEnd/:dtEnd",
  (req, res) => {
    Issue.find({
      assignedTo: req.params.assignedTo,
      createdAt: { $gte: req.params.dtStart, $lte: req.params.dtEnd }
    })
      .then(issue => res.json(issue))
      .catch(err => res.status(400).json("Error: " + err));
  }
);

// init + dates
router.get(
  "/search/initiatedBy/:initiatedBy/dtStart/:dtStart/dtEnd/:dtEnd",
  (req, res) => {
    Issue.find({
      name: req.params.initiatedBy,
      createdAt: { $gte: req.params.dtStart, $lte: req.params.dtEnd }
    })
      .then(issue => res.json(issue))
      .catch(err => res.status(400).json("Error: " + err));
  }
);
module.exports = router;
