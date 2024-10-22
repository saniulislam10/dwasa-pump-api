const Pump = require("../models/pump.js");

const validateData = async (data) => {
    const product = new Pump(data); // Create an instance of the model
    try {
        await product.validate(); // Validate the instance
        return true; // Valid
    } catch (validationError) {
        return validationError; // Return the validation error
    }
};


exports.add = async (req, res, next) => {

    try {

        const pump = new Pump(req.body);

        const newPump = await pump.save();

        // Final Response
        res.status(200).json({
            data: newPump,
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

        const pump = await Pump.updateOne(req.body);

        // Final Response
        res.status(200).json({
            data: pump,
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
        const filter = req.body.filter;
        let dataDoc;
        if (filter) {
            dataDoc = Pump.find(filter);
        } else {
            dataDoc = Pump.find();
        }
        const pumps = await dataDoc;


        // Final Response
        res.status(200).json({
            message: "Success",
            data: pumps
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
        const pump = await Pump.findOne({ _id: req.params.id });

        // Final Response
        res.status(200).json({
            message: "Success",
            data: pump
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
        const update = await Pump.findByIdAndDelete(id);


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