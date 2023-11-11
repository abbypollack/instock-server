const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
        const data = await knex('warehouses');
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving warehouse: ${error}`)
    }
}

const search = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await knex('warehouses').where({ id }).first();
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Warehouse was not found' });
        }
    } catch (error) {
        res.status(400).send(`Error retrieving warehouse: ${error}`);
    }
};


const add = async (req, res) => {
    try {
        const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;
        if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
            return res.status(400).json({ error: "Please fill in all required fields" });
        } else if (!isValidPhoneNumber(contact_phone)) {
            return res.status(400).json({ error: "Invalid phone number" });
        } else if (!isValidEmail(contact_email)) {
            return res.status(400).json({ error: "Invalid email" });
        } else {
            const result = await knex('warehouses').insert(req.body);

            const newWarehouseId = result[0];
            const createdWarehouse = await knex("warehouses").where({ id: newWarehouseId });
            res.status(201).json(createdWarehouse);
        }
    } catch (error) {
        res.status(500).json({
            message: `Can't create new warehouse: ${error}`
        })
    }
    function isValidPhoneNumber(phoneNumber) {
        const phoneRegex = /^\+?1?\s*\(\d{3}\)\s*\d{3}-\d{4}$/;
        return phoneRegex.test(phoneNumber);
    }
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

const edit = async (req, res) => {
    const { id } = req.params;
    const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;

    if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+?1?\s*\(\d{3}\)\s*\d{3}-\d{4}$/;
        return phoneRegex.test(phoneNumber);
    };

    if (!isValidPhoneNumber(contact_phone)) {
        return res.status(400).json({ error: "Invalid phone number" });
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    if (!isValidEmail(contact_email)) {
        return res.status(400).json({ error: "Invalid email" });
    }

    try {
        const updatedRows = await knex('warehouses')
            .where({ id })
            .update({
                warehouse_name,
                address,
                city,
                country,
                contact_name,
                contact_position,
                contact_phone,
                contact_email
            });

        if (updatedRows) {
            const updatedWarehouse = await knex('warehouses').where({ id }).first();
            res.status(200).json(updatedWarehouse);
        } else {
            res.status(404).json({ error: `Cannot find a warehouse with the ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `sorry coudn't update ${id}:${error}` });
    }
};

const remove = async (req, res) => {
    try {
        const deletedInventories = await knex('inventories')
            .where({ warehouse_id: req.params.id })
            .del();

        const deleteWarehouse = await knex('warehouses')
            .where({ id: req.params.id })
            .del();

        if (deleteWarehouse === 0) {
            return res.status(404).json({
                message: `Unable to remove Warehouse because it does not exist`
            });
        }
        else {
            res.status(204)
        }
    } catch (error) {
        res.status(500).json({
            message: `Unable to remove Warehouse: ${error.message}`
        });
    }
};

const inventory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await knex('inventories').where({ warehouse_id: id });
        if (data.length === 0) {
            return res.status(404).json({ error: "No inventory found" });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(400).send(`Error retrieving inventories: ${error}`);
    }
};

module.exports = {
    index,
    search,
    add,
    edit,
    remove,
    inventory
};