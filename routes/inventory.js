const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'))


router.get('/', async (req, res) => {
  const response = await knex('inventories');
  res.status(200).json(response);
})

router.get('/:inventoryItemId', async (req, res) => {
  const respose = await knex('inventories').where({ id: req.params.inventoryItemId})
  res.json(respose);
})
// ******PUT/EDIT API FOR A SINGLE INVENTORY ITEM******
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { warehouse_id, item_name, description, category, status, quantity } = req.body;
//   let updateQuantity = quantity;

//   // VALIDATION: According to instructions, all values are required (non-empty). For incorrect/incomplete data, the correct error response needs to be sent (with status code and message).
//   if (!warehouse_id || !item_name || !description || !category || !status) {
//     return res.status(400).json({ error: 'Missing required fields' }); // Response returns 400 if unsuccessful because of missing properties in the request body
//   }

//   if (status.toLowerCase() === 'in stock' && (quantity === undefined || isNaN(quantity) || quantity < 0)) {
//     return res.status(400).json({ error: 'Quantity must be a non-negative number when in stock' }); // Response returns 400 if the quantity is not a number
//   }
//   if (status.toLowerCase() === 'out of stock') {
//     updateQuantity = 0;
//   } else {
//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 0) {
//       return res.status(400).json({ error: 'Quantity must be a non-negative number when in stock' });
//     }
//     updateQuantity = parsedQuantity;
//   }


//   const warehouseExists = await knex('warehouses').where({ id: warehouse_id }).first();
//   if (!warehouseExists) {
//     return res.status(400).json({ error: 'warehouse_id does not exist in the warehouses table' }); // Response returns 400 if the warehouse_id value does not exist in the warehouses table
//   }

//   try {
//     // Updates the item in the database
//     const updatedRows = await knex('inventory')
//       .where({ id }) // According to instructions, can not replace the ID, so we're only applying to the inventory item whose id matches the one from the URL.
//       .update({
//         warehouse_id,
//         item_name,
//         description,
//         category,
//         status: status.toLowerCase() === 'in stock' ? 'In Stock' : 'Out of Stock',
//         quantity: updateQuantity,
//       });

//     if (updatedRows) {
//       const updatedItem = await knex('inventory').where({ id }).first();
//       res.status(200).json(updatedItem); // Response returns 200 if successful
//     } else {
//       res.status(404).json({ error: 'Inventory item not found' }); // Response returns 404 if inventory ID is not found
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// ******END OF PUT/EDIT API FOR A SINGLE INVENTORY ITEM******

module.exports = router;