const express = require('express');
const router = express.Router();
const warehouseControl = require("../controllers/warehouse-controller");

router
    .route("/")
    .get(warehouseControl.index)
    .post(warehouseControl.add)

router
    .route("/:id")
    .get(warehouseControl.search)
    .patch(warehouseControl.edit)
    .delete(warehouseControl.remove);

router
    .route("/:id/inventories")
    .get(warehouseControl.inventory)

module.exports = router;