const asyncHandler = require("express-async-handler");
const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

// Email sender setup
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Email sent to:", to);
  } catch (err) {
    console.log("Email error:", err.message);
  }
};

// Student - Submit complaint
const createComplaint = asyncHandler(async (req, res) => {
  const { studentId, category, description, image } = req.body;

  const student = await User.findById(studentId);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  if (!student.wardenId) {
    res.status(400);
    throw new Error("Student has no warden assigned");
  }

  const complaint = await Complaint.create({
    studentId,
    wardenId: student.wardenId,
    category,
    description,
    image: image || null,
  });

  // Email to student
  await sendEmail(
    student.email,
    "Complaint Submitted Successfully",
    `Dear ${student.name},\n\nYour complaint has been submitted successfully.\n\nCategory: ${category}\nDescription: ${description}\nStatus: PENDING\n\nWe will get back to you soon.\n\nThank you.`
  );

  res.status(201).json(complaint);
});

// Student - Get own complaints
const getStudentComplaints = asyncHandler(async (req, res) => {
  const { objectId } = req.query;
  console.log("getStudentComplaints objectId:", objectId);
  const complaints = await Complaint.find({ studentId: objectId }).sort({
    createdAt: -1,
  });
  res.json(complaints);
});

// Warden - Get all complaints
const getWardenComplaints = asyncHandler(async (req, res) => {
  const { objectId } = req.query;
  console.log("getWardenComplaints objectId:", objectId);
  const complaints = await Complaint.find({ wardenId: objectId })
    .populate("studentId", "name id email dept room year")
    .sort({ createdAt: -1 });
  res.json(complaints);
});

// Warden - Resolve complaint
const resolveComplaint = asyncHandler(async (req, res) => {
  const { wardenComment } = req.body;

  const complaint = await Complaint.findById(req.params.id).populate(
    "studentId",
    "name email"
  );

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  complaint.status = "RESOLVED";
  complaint.wardenComment = wardenComment || "";
  await complaint.save();

  // Email to student
  await sendEmail(
    complaint.studentId.email,
    "Your Complaint has been Resolved ✅",
    `Dear ${complaint.studentId.name},\n\nYour complaint has been resolved.\n\nCategory: ${complaint.category}\nDescription: ${complaint.description}\nWarden Comment: ${wardenComment || "No comment"}\nStatus: RESOLVED\n\nThank you.`
  );

  res.json(complaint);
});

// Warden - Reject complaint
const rejectComplaint = asyncHandler(async (req, res) => {
  const { wardenComment } = req.body;

  const complaint = await Complaint.findById(req.params.id).populate(
    "studentId",
    "name email"
  );

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  complaint.status = "REJECTED";
  complaint.wardenComment = wardenComment || "";
  await complaint.save();

  // Email to student
  await sendEmail(
    complaint.studentId.email,
    "Your Complaint has been Rejected ❌",
    `Dear ${complaint.studentId.name},\n\nYour complaint has been rejected.\n\nCategory: ${complaint.category}\nDescription: ${complaint.description}\nWarden Comment: ${wardenComment || "No comment"}\nStatus: REJECTED\n\nThank you.`
  );

  res.json(complaint);
});

module.exports = {
  createComplaint,
  getStudentComplaints,
  getWardenComplaints,
  resolveComplaint,
  rejectComplaint,
};