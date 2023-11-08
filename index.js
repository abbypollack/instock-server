require ('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json());

// app.use('/static', express.static('public'));
const warehouseRoutes = require('./routes/warehouse-routes');
app.use('/warehouses', warehouseRoutes)
    
app.listen(PORT, () => {
    console.log(`Server is running! at http://localhost:${PORT}`);
});
