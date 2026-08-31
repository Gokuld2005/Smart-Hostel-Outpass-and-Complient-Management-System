const asyncHandler = require("express-async-handler");
const Register = require("../models/registerModel");
const Outpass = require("../models/outpassModel");

const scanQR = asyncHandler(async (req, res) => {
  const qrCode = req.query.qrCode;
  console.log("qrController scanQr qrCode: ", qrCode);
  try {
    const outpass = await Outpass.findOne({
      qrCode,
    })
      .populate("studentId") // Replace "studentId" with the correct field name/path
      .exec();
    const message = "Scan success!";
    if (outpass) {
      res.json(outpass);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while scanning QR Code",
    });
  }
});

const registerEntry = asyncHandler(async (req, res) => {
  // Approve an outpass by faculty or hostel warden
  const outpassId = req.params.id;
  await Register.findOne({ outpassId: outpassId })
    .populate("outpassId")
    .then(async (entry) => {
      if (entry) {
        if (!entry.inTime) {
          entry.inTime = new Date();
          entry.outpassId.status = "INACTIVE";
          await entry.save();
          await entry.outpassId.save();
          res.json(entry);
        } else {
          res.json({
            status: "FAILED",
            message: "An error occurred with inTime entry",
          });
        }
      } else {
        const outpass = await Outpass.findById(outpassId);
        outpass.status = "ACTIVE";
        outpass.save();
        const entry = await Register.create({
          outpassId,
          outTime: new Date(),
        });
        res.json(entry);
      }
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while entry-ing",
      });
    });
});

const entries = asyncHandler(async (req, res) => {
  await Register.find({})
    .populate({
      path: "outpassId",
      populate: {
        path: "studentId",
        model: "user",
      },
    })
    .exec()
    .then((records) => {
      if (records.length) {
        console.log(records);
        res.json(records);
      } else {
        res.json({
          status: "FAILED",
          message: "No records",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occured while checking for entries",
      });
    });
});

module.exports = { scanQR, registerEntry, entries };
