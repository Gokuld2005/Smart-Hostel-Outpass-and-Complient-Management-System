const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    sNo: {
      type: Number,
      auto: true,
    },
    outpassId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "outpass",
      required: true,
    },
    outTime: {
      type: Date,
      default: null,
    },
    inTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Register = mongoose.model("Register", registerSchema);
module.exports = Register;
