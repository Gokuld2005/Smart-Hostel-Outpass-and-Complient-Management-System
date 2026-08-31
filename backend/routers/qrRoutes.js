const express = require("express");
const {
  scanQR,
  registerEntry,
  entries,
} = require("../controllers/qrControllers");

const router = express.Router();

router.route("/").get(scanQR);
router.route("/:id/").put(registerEntry);
router.route("/entries").get(entries);

module.exports = router;
