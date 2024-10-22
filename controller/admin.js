const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Require Post Schema from Model..
const Admin = require("../models/admin.js");

const validateData = async (data) => {
    const product = new Admin(data); // Create an instance of the model
    try {
        await product.validate(); // Validate the instance
        return true; // Valid
    } catch (validationError) {
        return validationError; // Return the validation error
    }
};

exports.adminSignUp = async (req, res, next) => {

    try {

        const bodyData = req.body;
        const { confirmPassword, password } = bodyData;
        delete bodyData.confirmPassword;
        const validationResult = await validateData(bodyData);

        // Step 1: Validate incoming data

        if (validationResult !== true) {
            return res.status(406).json({
                message: validationResult.message,
                errors: validationResult.errors, // or handle the error structure as needed
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password does not match",
            });
        }
        const hashedPass = bcrypt.hashSync(password, 8);

        const user = new Admin({ ...bodyData, ...{ password: hashedPass } });

        const newUser = await user.save();
        res.status(200).json({
            success: true,
            message: "Admin Registration Success!",
            userId: newUser._id,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        if (!err.message) {
            err.message = "Something went wrong on database operation!";
        }
        next(err);
    }
};
exports.adminLogin = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        let token;

        const admin = await Admin.findOne({
            $or: [
                { username: username },
                { email: username },
            ]
        }
        );
        if (!admin) {
            return res.status(401).json({
                message: "A Admin with this username could not be found!",
                success: false,
            });
        } else {
            const isEqual = bcrypt.compareSync(password, admin.password);

            if (!isEqual) {
                res.status(400).json({
                    message: "You entered a wrong password!",
                    success: false,
                });
            } else {
                // For Json Token Generate..
                token = jwt.sign(
                    {
                        username: admin.username,
                        userId: admin._id,
                    },
                    process.env.JWT_PRIVATE_KEY_ADMIN,
                    {
                        expiresIn: "365d",
                    }
                );

                // Final Response
                res.status(200).json({
                    message: "Login Success",
                    success: true,
                    token: token,
                    expiredIn: 864000000,
                });
            }
        }
    } catch (err) {
        console.error(err);
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
        const admins = await Admin.find();


        // Final Response
        res.status(200).json({
            message: "Success",
            data: admins
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
        const update = await Admin.findByIdAndDelete(id);


        // Final Response
        res.status(200).json({
            message: update ?  "Deleted Successfully" : "Not updated",
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