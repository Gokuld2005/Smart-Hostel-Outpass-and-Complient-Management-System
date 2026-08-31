const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unqiue: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        number: {
            type: String,
            required: true,
            trim: true,
        },
        dept: {
            type: String,
            trim: true,
        },
        year: {
            type: Number,
            trim: true,
        },
        room: {
            type: String,
            trim: true,
        },
        job: {
            type: String,
            // enum: ["student", "faculty", "warden", "security"],
        },
        outpassList: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "outpass",
                },
            ],
            default: [],
        },
        classInchargeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        noOfOutpasses: {
            type: Number,
            trim: true,
        },
        wardenId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        // idAdmin: {
        //     //just in case if we need it
        //     type: Boolean,
        //     required: true,
        //     default: false,
        // },
    },
    {
        // to check when this data was added into database
        timestamps: true,
    }
);

// these lines are used to encrypt the password in database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// decrypting password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
