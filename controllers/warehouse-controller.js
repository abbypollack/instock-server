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
    try{
        const { id } = request.params;
        const { warehouses_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = request.body;

        if (!warehouses_name || !address || !city || !country, !contact_name || !contact_position || !contact_phone, !contact_email){
            return response.status(400).json({error: "Please fill in all required fields"});
        }
        else{
            response.send(request.body)
        }
    } catch{
        response.status(500).json({
            message: `Can't create new warehouse: ${error}`
        })
    }
}

module.exports = {
    index,
    add,
};