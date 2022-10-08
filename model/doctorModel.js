const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    portfolio: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    feePerConsultation: {
        type: Number,
        required: true
    },
    timings: {
        type: Array,
        required: true
    }
},
{
    timestamps: true
});

const doctorModel = mongoose.model("doctor",doctorSchema);

module.exports = doctorModel;