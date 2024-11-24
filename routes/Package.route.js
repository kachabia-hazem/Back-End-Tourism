const express = require("express");
const router = express.Router();
const PackageController = require("../controllers/Package.controller");
const cors = require("cors");
const upload = require("../middlewares/upload");

router.use(cors());

router.get("/", PackageController.getAllPackages);
router.get("/:id", PackageController.getPackageById);
router.post("/create",  upload.array("images"), PackageController.createPackage);
router.put("/update",  upload.array("images"), PackageController.updatePackage);
router.delete("/delete/:id", PackageController.deletePackage);

module.exports = router;
