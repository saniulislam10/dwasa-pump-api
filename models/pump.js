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
    sourceIdentification: {
        type: Number,
        // 1 means active, 2 means inactive
        enum:[1,2],
        required: true,
    },
    pumpLocation: {
        type: String,
        required: false,
    },
    dma: {
        type: String,
        required: false,
    },
    zone: {
        type: String,
        required: true,
    },
    installationYear: {
        type: Number,
        required: true,
    },
    depth: {
        type: Number,
        required: false,
    },
    chlorinationUnitStatus: {
        type: Number,
        // 1 means active, 2 means inactive
        enum: [1,2],
        required: false,
    },
    pumpRunningStatus: {
        type: Number,
        // 1 means active, 2 means inactive
        enum: [1,2],
        required: false,
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Pump', schema);
