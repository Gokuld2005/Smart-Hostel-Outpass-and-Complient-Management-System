const mongoose = require("mongoose");

const outpassSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    classInchargeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    wardenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    from: Date,
    to: Date,
    reason: String,
    place: String,
    status: {
      type: String,
      enum: [
        "REQUESTED1",
        "REQUESTED2",
        "APPROVED",
        "REJECTED",
        "ACTIVE",
        "INACTIVE",
        "EXPIRED",
      ],
    },
    qrCode: {
      type: String,
      default: null,
    },
  },
  {
    // to check when this data was added into database
    timestamps: true,
  }
);

const Outpass = mongoose.model("outpass", outpassSchema);
module.exports = Outpass;