
const express = require('express')
const {
    pendingOutpass,
    insertOutpass,
    approveOutpass,
    rejectOutpass,

    pendingOutpassStudent,
    pendingOutpassFaculty,
    pendingOutpassWarden
} = require("../controllers/outpassControllers")
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/')
    .get(pendingOutpassStudent)
    .post(insertOutpass);

router.route('/faculty').get(pendingOutpassFaculty)
router.route('/warden').get(pendingOutpassWarden)

router.route('/:id/approve').put(approveOutpass);
router.route('/:id/reject').put(rejectOutpass);

module.exports = router;