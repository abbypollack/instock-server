require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventory-routes'); // Importing router from inventory-routes.js
const warehouseRoutes = require('./routes/warehouse-routes'); // Importing router from warehouse-routes.js

const app = express();
const PORT = process.env.PORT || 8083;

app.use(cors())
app.use(express.json());

app.use('/api/inventories', inventoryRoutes); // Declared "/api/inventories" as the path for inventoryRoutes
app.use('/api/warehouses', warehouseRoutes); // Declared "/api/warehouses" as the path for warehouseRoutes

    
app.listen(PORT, () => {
    console.log(`Server is running! at http://localhost:${PORT}`);
});
