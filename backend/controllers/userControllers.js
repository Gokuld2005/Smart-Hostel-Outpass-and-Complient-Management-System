
const asyncHandler = require("express-async-handler");
const { findOne } = require("../models/userModel");
const User = require("../models/userModel")
const Outpass = require("../models/outpassModel")
const generateToken = require("../utils/generateToken");


const registerUser = asyncHandler(async (req, res) => {
    //getting data from user 
    const { id, name, gender, email, password, number, job, dept, year, room, wardenId, classInchargeId } = req.body;

    //chk if user aready exist
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // else
    const user = await User.create({
        id, name, gender, email, password, number, job, dept, year, room, wardenId, classInchargeId
    })

    //if user is created, create response for it  
    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            gender: user.gender,
            email: user.email,
            password: user.password,
            number: user.number,
            job: user.job,
            dept: user.dept,
            year: user.year,
            room: user.room,
            wardenId: user.wardenId,
            classInchargeId: user.classInchargeId,
            // isAdmin: user.isAdmin,
            // send also the token to the client 
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400);
        throw Error("Error Occured in creating user")
    }
})


// login function
const authUser = asyncHandler(async (req, res) => {
    //getting data from user 
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // if user exist and password matches
    if (user && (await user.matchPassword(password))) {
        res.json({
            objectId:user._id,
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            number: user.number,
            dept: user.dept,
            year: user.year,
            room: user.room,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw Error("Invalid Email or Password")
    }
})

// student details function
const studentData = asyncHandler(async (req, res) => {
    console.log(req.params.studentId);
    await User.findById(req.params.studentId)
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.json("No user like that ");
            }
        })
        .catch((err) => {
            res.json("server error");
        });
});
// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found with this email");
  }
  user.password = newPassword;
  await user.save();
  res.json({ message: "Password reset successfully" });
});

module.exports = { registerUser, authUser, studentData, resetPassword };
