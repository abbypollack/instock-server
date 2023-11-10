const express = require('express');
const router = express.Router();
const inventoryController = require ('../controllers/inventory-controller')


// ******GET/POST API FOR ALL INVENTORY ITEMS******
router
    .route('/')
    .get(inventoryController.index)
    .post(inventoryController.add)

// ******GET/PUT/DELETE API FOR A SINGLE INVENTORY ITEM******
router
    .route('/:id')
    .get(inventoryController.find)
    .delete(inventoryController.remove)
    .put(inventoryController.update)
    



module.exports = router;