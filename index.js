require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventory-routes'); // Importing router from inventory.js



const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json());

app.use('/api/inventories', inventoryRoutes); // Declared "/api/inventories" as the path for inventoryRoutes
const warehouseRoutes = require('./routes/warehouse-routes');
app.use('/api/warehouses', warehouseRoutes)
    
app.listen(PORT, () => {
    console.log(`Server is running! at http://localhost:${PORT}`);
});
