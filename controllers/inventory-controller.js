const knex = require('knex')(require('../knexfile'));

const update = async (req, res) => {
    const { id } = req.params;
    const { warehouse_id, item_name, description, category, status, quantity } = req.body;
    let updateQuantity = quantity;
    
    if (!warehouse_id || !item_name || !description || !category || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (status.toLowerCase() === 'in stock' && (quantity === undefined || isNaN(quantity) || quantity < 0)) {
      return res.status(400).json({ error: 'Quantity must be a non-negative number when in stock' });
    }
    if (status.toLowerCase() === 'out of stock') {
      updateQuantity = 0;
    } else {
      const parsedQuantity = parseInt(quantity, 10);
      if (isNaN(parsedQuantity) || parsedQuantity < 0) {
        return res.status(400).json({ error: 'Quantity must be a non-negative number when in stock' });
      }
      updateQuantity = parsedQuantity;
    }
    
    const warehouseExists = await knex('warehouses').where({ id: warehouse_id }).first();
    if (!warehouseExists) {
      return res.status(400).json({ error: 'warehouse_id does not exist in the warehouses table' });
    }
    
    try {
      const updatedRows = await knex('inventories')
        .where({ id })
        .update({
          warehouse_id,
          item_name,
          description,
          category,
          status: status.toLowerCase() === 'in stock' ? 'In Stock' : 'Out of Stock',
          quantity: updateQuantity,
        });
    
      if (updatedRows) {
        const updatedItem = await knex('inventories').where({ id }).first();
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ error: 'Inventory item not found' }); 
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    update
}