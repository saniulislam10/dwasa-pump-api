const TestHistory = require("../models/testHistory.js");
const Pump = require("../models/pump.js");

const validateData = async (data) => {
    const product = new TestHistory(data); // Create an instance of the model
    try {
        await product.validate(); // Validate the instance
        return true; // Valid
    } catch (validationError) {
        return validationError; // Return the validation error
    }
};


exports.add = async (req, res, next) => {

    try {
        const id = req.adminData.userId;
        const finalData = {...{tester: id}, ...req.body}
        const testHistory = new TestHistory(finalData);

        const updated = await Pump.updateOne({ _id: testHistory.pumpId }, { $set: { pumpRunningStatus: testHistory.pumpStatus } });
        if (updated.modifiedCount < 1) {
            res.status(404).json({
                message: "Pump not found",
            });
        }
        const newData = await testHistory.save();

        // Final Response
        res.status(200).json({
            data: newData,
            message: "Successfully Added",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        console.log(err);
        next(err);
    }
};
exports.edit = async (req, res, next) => {

    try {

        const validationResult = await validateData(req.body);

        // Step 1: Validate incoming data

        if (validationResult !== true) {
            return res.status(406).json({
                message: validationResult.message,
                errors: validationResult.errors, // or handle the error structure as needed
            });
        }
        const testHistory = await TestHistory.findOneAndUpdate(
            { _id: req.body._id },
            { $set: req.body }
        );

        // Final Response
        res.status(200).json({
            data: testHistory,
            message: "Successfully Edited",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        console.log(err);
        next(err);
    }
};
exports.addComment = async (req, res, next) => {

    try {

        
        const testHistory = await TestHistory.updateOne(
            { _id: req.body._id },
            { $set: {
                comment: req.body.comment
            } }
        );

        // Final Response
        res.status(200).json({
            data: testHistory,
            message: "Successfully Edited",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        console.log(err);
        next(err);
    }
};
exports.getAll = async (req, res, next) => {
    try {
        const filter = req.body.filter || {};
        const zoneFilter = req.body.filter?.zone; // Zone passed from the request body
        let dataDoc;

        // If zoneFilter exists, find pumpIds based on the zone
        if (zoneFilter) {
            console.log(zoneFilter);
            const pumps = await Pump.find({ zone: zoneFilter }).select('_id'); // Assuming Pump is the model for the pump
            const pumpIds = pumps.map(pump => pump._id);
            delete filter.zone;

            // Add pumpId filter to the query
            filter.pumpId = { $in: pumpIds };
        }

        // Fetch TestHistory data with optional filter
        dataDoc = TestHistory.find(filter);

        const data = await dataDoc.populate({
            path: 'pumpId',
            select: 'name zone'
        });

        // Final Response
        res.status(200).json({
            message: "Success",
            data: data
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        console.log(err);
        next(err);
    }
};

exports.getById = async (req, res, next) => {

    try {
        const testHistory = await TestHistory.findOne({ _id: req.params.id }).populate('tester pumpId');

        // Final Response
        res.status(200).json({
            message: "Success",
            data: testHistory
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        console.log(err);
        next(err);
    }
};
exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const update = await TestHistory.findByIdAndDelete(id);


        // Final Response
        res.status(200).json({
            message: update ? "Deleted Successfully" : "Not updated",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        console.log(err);
        next(err);
    }
}