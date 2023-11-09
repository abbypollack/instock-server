const knex = require('knex')(require('../knexfile'));

const index = async (_request, response) => {
    try {
        const data = await knex('warehouses');
        response.status(200).json(data);
    } catch (error) {
        response.status(400).send(`Error retrieving warehouse: ${error}`)
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


const add = async (request, response) => {
    try {
        const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = request.body;
        if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
            return response.status(400).json({ error: "Please fill in all required fields" });
        } else if (!isValidPhoneNumber(contact_phone)) {
            return response.status(400).json({ error: "Invalid phone number" });
        } else if (!isValidEmail(contact_email)) {
            return response.status(400).json({ error: "Invalid email" });
        } else {
            const result = await knex('warehouses').insert(request.body);

            const newWarehouseId = result[0];
            const createdWarehouse = await knex("warehouses").where({ id: newWarehouseId });
            response.status(201).json(createdWarehouse);
        }
    } catch (error) {
        response.status(500).json({
            message: `Can't create new warehouse: ${error}`
        })
    }
    function isValidPhoneNumber(phoneNumber) {
        let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return phoneRegex.test(phoneNumber);
    }
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

const edit = async (request, response) => {
    try {
        const editWarehouse = await knex('warehouses')
            .where({ id: request.params.id })
            .update(request.body);
        if (editWarehouse === 0) {
            return response.status(404).json({
                message: `Cannot find a warehouse with that ID of ${request.params.id}`
            });
        }
        else{
            response.status(201).json(editWarehouse);
        }

    } catch (error) {
        response.status(500).json({
            message: `sorry coudn't update ${request.params.id}:${error}`
        })
    }
};

const remove = async (request, response) => {
    try{
        const deleteWarehouse = await knex('warehouses')
        .where({ id: request.params.id })
        .delete();

        if (deleteWarehouse === 0){
            return response
            .status(404).json({
                message: `Unable to remove Warehouse because it does not exist`
            });
        }
        else{
            response.sendStatus(204)
        }
    } catch (error) {
        response.sendStatus(500).json({
            message: `Unable to remove Warehouse ${error}`
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