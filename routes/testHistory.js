// Main Module Required..
const express = require("express");

const controller = require("../controller/testHistory");
const checkAdminAuth = require("../middileware/check-admin-auth");
const router = express.Router();

router.post("/add", checkAdminAuth, controller.add);
router.put("/edit", controller.edit);
router.post("/add-comment", controller.addComment);
router.post("/get-all", controller.getAll);
router.get("/get-by-id/:id", controller.getById);
router.delete("/delete/:id", checkAdminAuth, controller.delete);

module.exports = router;