const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pumpId: {
        type: Schema.Types.ObjectId,
        ref: "Pump",
        required: true,
    },
    pumpStatus: {
        type: Number,
        // 1 means active, 2 means inactive
        enum: [1,2],
        required: true,
    },
    waterProduction : {
        type: Number,
        required: function () {
            // Make required if pumpStatus is 1 (active)
            return this.pumpStatus === 1;
        },
    },
    freeResidualChlorine  : {
        type: Number,
        required: function () {
            // Make required if pumpStatus is 1 (active)
            return this.pumpStatus === 1;
        },
    },
    totalResidualChlorine  : {
        type: Number,
        required: function () {
            // Make required if pumpStatus is 1 (active)
            return this.pumpStatus === 1;
        },
    },
    combinedResidualChlorine  : {
        type: Number,
        required: function () {
            // Make required if pumpStatus is 1 (active)
            return this.pumpStatus === 1;
        },
    },
    testTime: {
        type: Date,
        required: true,
    },
    testDate: {
        type: Date,
        required: true,
    },
    tester: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    comment:{
        type: String,
        required: false
    }    
}, {
    timestamps: true
});


module.exports = mongoose.model('TestHistory', schema);
