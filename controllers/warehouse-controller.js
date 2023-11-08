const knex = require('knex')(require('../knexfile'));

const index = async (_request, response) => {
    try {
        const data = await knex('warehouses');
        response.status(200).json(data);
    } catch (error) {
        response.status(400).send(`Error retrieving warehouse: ${error}`)
    }
}

const add = async (request, response) => {
    try {
        const { id } = request.params;
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
        var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return phoneRegex.test(phoneNumber);
    }
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

module.exports = {
    index,
    add,
};