const express = require('express');
const router = express.Router();
const inventoryController = require ('../controllers/inventory-controller')

// ******GET API FOR ALL INVENTORY ITEMS******
router
    .route('/')
    .get(inventoryController.index)

// ******PUT/EDIT API FOR A SINGLE INVENTORY ITEM******
router
    .route('/:id')
    .put(inventoryController.update)

// ******END OF PUT/EDIT API FOR A SINGLE INVENTORY ITEM******

module.exports = router;