const knex = require('knex')(require('../knexfile'));

const index = async (_request, response) => {
    try {
        const data = await knex('warehouses');
        response.status(200).json(data);
    } catch (error) {
        response.status(400).send(`Error retrieving warehouse: ${error}`)
    }
}

// const findOne = async (request, response) => {
//     try {
//         const warehouseFound = await knex('warehouses')
//             .where({ id: request.params.id });

//         if (warehouseFound.length === 0) {
//             return response.status(404).json({
//                 message: `Warehouse with the id ${request.params.id} cannot be found`
//             });
//         }

//         const warehouseData = warehouseFound[0];
//         response.json(warehouseData);
//     } catch (error) {
//         response.status(500).json({
//             message: `Warehouse not found with the id of ${request.params.id}`,
//         });
//     }
// };

const add = async (request, response) => {
    try {
        const result = await knex ('warehouses').insert(request.body);

        const newHouseId = result[0];
        const createdWarehouse = await knex('warehouses').where({ id: newHouseId});

        response.status(201).json(createdWarehouse);
    } catch (error) {
        response.status(500).json({
            message: `Can't create new warehouse: ${error}`
        })
    }
}
module.exports = {
    index,
    add,
};