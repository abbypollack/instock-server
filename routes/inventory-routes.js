const express = require('express');
const router = express.Router();
const inventoryController = require ('../controllers/inventory-controller')

router
    .route('/')
    .get(inventoryController.index)

router
    .route('/:id')
    .delete(inventoryController.remove)
    .get(inventoryController.find)
    .put(inventoryController.update)



module.exports = router;