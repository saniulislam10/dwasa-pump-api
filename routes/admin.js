// Main Module Required..
const express = require("express");

const controller = require("../controller/admin");

const router = express.Router();

router.post("/registration", controller.adminSignUp);
router.post("/login", controller.adminLogin);
router.get("/get", controller.getAll);
router.delete("/delete/:id", controller.delete);

module.exports = router;