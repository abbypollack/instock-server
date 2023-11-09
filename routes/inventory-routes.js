const express = require('express');
const router = express.Router();
const inventoryController = require ('../controllers/inventory-controller')

router
.route('/:id')
  .delete(inventoryController.remove)
  .put(inventoryController.update)


module.exports = router;