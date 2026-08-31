const express = require("express");
const {
  createComplaint,
  getStudentComplaints,
  getWardenComplaints,
  resolveComplaint,
  rejectComplaint,
} = require("../controllers/complaintControllers");

const router = express.Router();

router.route("/").post(createComplaint);
router.route("/student").get(getStudentComplaints);
router.route("/warden").get(getWardenComplaints);
router.route("/resolve/:id").put(resolveComplaint);
router.route("/reject/:id").put(rejectComplaint);

module.exports = router;