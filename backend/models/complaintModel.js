const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    wardenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: String,
      enum: ["Hostel related", "Food related", "Maintenance related"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "RESOLVED", "REJECTED"],
      default: "PENDING",
    },
    wardenComment: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("complaint", complaintSchema);
module.exports = Complaint;