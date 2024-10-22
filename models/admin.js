const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name can be at most 50 characters"],
    },
    fatherName: {
        type: String,
        required: false,
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name can be at most 50 characters"],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        unique: [true, "This password is already used by another user."],
        required: [true, "Password is required"]
    },
    phoneNo: {
        type: String,
        unique: [true, "This phone number is already used by another user."],
        trim: true,
        required: true,
        match: [
            /^(?:\+88|88)(01[3-9]\d{8})$/,
            "Please enter a valid Bangladeshi phone number starting with 88 & maximum length 13.",
        ],
    },
    address: {
        type: String,
        required: false,
        trim: true,
        minlength: [5, "Address must be at least 5 characters"],
        maxlength: [100, "Address must be at most 100 characters"],
    },
    profileImg: {
        type: String,
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    joiningDate: {
        type: Date,
        required: false
    },
    religion: {
        type: String,
        enum: ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"],
        required: false
    },
    bloodGroup: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: false
    },
    presentAddress: {
        type: String,
        required: false
    },
    permanentAddress: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Admin', schema);
