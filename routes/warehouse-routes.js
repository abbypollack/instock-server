const express = require('express');
const router = express.Router();
const warehouseControl = require("../controllers/warehouse-controller");
const { v4: uuidv4 } = require('uuid');

router
    .route("/")
    .get(warehouseControl.index)
    .post(warehouseControl.add)

router
    .route("/:id")
    .get(warehouseControl.index)
    .patch(warehouseControl.edit)

module.exports = router;