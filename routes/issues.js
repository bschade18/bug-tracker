const router = require("express").Router();
const auth = require("../middleware/verifyToken");
let Issue = require("../models/issue.model");

// @route GET /issue
// @desc get items
// @access Public
router.get("/", (req, res) => {
  //mongoose command
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST issue/add
// @desc create an item
// @access Public
router.post("/add", auth, (req, res) => {
  const issueTitle = req.body.issueTitle;
  const name = req.body.name;
  const issueDescription = req.body.issueDescription;
  const date = req.body.date;
  const number = req.body.number;
  const issueLog = req.body.issueLog;
  const assignedTo = req.body.assignedTo;
  const status = req.body.status;

  // create a new issue using the variable we have from above
  const newIssue = new Issue({
    name,
    issueDescription,
    date,
    number,
    issueTitle,
    issueLog,
    assignedTo,
    status
  });

  newIssue
    .save()
    .then(() => res.json("Issue added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//  /issue/:id + get request
router.route("/:id").get((req, res) => {
  Issue.findById(req.params.id)
    .then(issue => res.json(issue))
    .catch(err => res.status(400).json("Error: " + err));
});

// /issue/:id + delete request
router.route("/:id").delete((req, res) => {
  Issue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Issue deleted."))
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

module.exports = router;
