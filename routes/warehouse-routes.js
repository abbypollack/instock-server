const express = require('express');
const router = express.Router();
const warehouseControl = require("../controllers/warehouse-controller");
const { v4: uuidv4 } = require('uuid');

router
    .route("/warehouses")
    .get(warehouseControl.index)
    .post(warehouseControl.add)

module.exports = router;