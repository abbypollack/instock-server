**Overview**
* The server provides RESTful API endpoints for managing inventory items and warehouses. It uses Knex.js for database queries and supports CRUD operations for both inventories and warehouses.

**Installation**
- Ensure MySQL is installed and running on your machine.
- Clone the repository if not already done for the client side.
- Install dependencies: npm install.
- Set up the environment variables by creating a .env file based on the .env.example provided.
- Run database migrations: npx knex migrate:latest.
- Seed the database (optional): npx knex seed:run.
- Start the server: npm run start.

**Usage**
- Access the API endpoints through http://localhost:8081/api/....
  
_Inventory Endpoints:_
* GET /api/inventories to retrieve all inventory items.
* POST /api/inventories to add a new inventory item.
* GET, PUT, DELETE /api/inventories/:id to retrieve, update, or delete an inventory item.
  
_Warehouse Endpoints:_
* GET /api/warehouses to retrieve all warehouses.
* POST /api/warehouses to add a new warehouse.
* GET, PUT, DELETE /api/warehouses/:id to retrieve, update, or delete a warehouse.
* GET /api/warehouses/:id/inventories to retrieve all inventories in a specific warehouse.
