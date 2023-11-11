const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
  try {
    const data = await knex('inventories')
      .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
      .select('inventories.*', 'warehouses.warehouse_name');
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving inventory: ${error}`)
  }
}
const find = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await knex('inventories')
      .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
      .select('inventories.*', 'warehouses.warehouse_name')
      .where('inventories.id', id)
      .first();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Inventory item not found' });
    }
  } catch (error) {
    res.status(400).send(`Error retrieving inventory: ${error}`);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;

  if (!warehouse_id || !item_name || !description || !category || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (status.toLowerCase() === 'in stock' && (isNaN(quantity)|| quantity < 0)) {
    return res.status(400).json({ error: 'Quantity must be a non-negative number when in stock' });
  }

  const updateQuantity = status.toLowerCase() === 'out of stock' ? 0 : quantity;

  const warehouseExists = await knex('warehouses').where({ id: warehouse_id }).first();
  if (!warehouseExists) {
    return res.status(400).json({ error: 'Warehouse ID does not exist in the database' });
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


const remove = async (req, res) => {
  const { id } = req.params;
  const removeInventory = await knex('inventories')
    .where({ id })
    .del();
  if (removeInventory > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Inventory item was not found' });
  }
};

const add = async (req, res) => {
  try {
    const { warehouse_id, item_name, description, category, status, quantity } = req.body;
    if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
      return res.status(400).json({ error: "please fill in all required fields" });
    } else if (isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ error: "quantity can't be less then zero" })
    }

    const warehouse = await knex('warehouses').where({ id: warehouse_id }).first();
    if (!warehouse) {
      return res.status(400).json({ error: "Warehouse ID does not exist" });
    }

    const result = await knex('inventories').insert(req.body);

    const newInventoryId = result[0];
    const createdInventory = await knex('inventories').where({ id: newInventoryId });
    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(500).json({
      message: `Can't add new inventory item: ${error}`
    })
  }
}

module.exports = {
  update,
  index,
  find,
  remove,
  add
}