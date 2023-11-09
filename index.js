require ('dotenv').config()
const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventory'); // Importing router from inventory.js



const app = express();
const PORT = process.env.PORT || 8083;

app.use(cors())
app.use(express.json());

app.use('/api/inventories', inventoryRoutes); // Declared "/api/inventories" as the path for inventoryRoutes
    
app.listen(PORT, () => {
    console.log(`Server is running!`, PORT);
});
