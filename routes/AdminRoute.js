import express from 'express';
import { loginAdmin,addReservation, getReservations, updateReservationStatus } from '../controller/AdminController.js'; // Ensure correct import path
import { addMenu, addMenuItem, deleteMenu, deleteMenuItem, getMenus } from '../controller/MenuController.js';
const adminRouter = express.Router();

// Define the login route
adminRouter.post("/login", loginAdmin);

// Define the reservation management route
adminRouter.post("/add-reservations", addReservation);
adminRouter.get("/reservations",getReservations);
adminRouter.put("/reservations/:id/status", updateReservationStatus); 

// Define the menu management route
adminRouter.post("/add-menu", addMenu);
adminRouter.get("/menus", getMenus);
adminRouter.delete("/menu/:menuId", deleteMenu);
adminRouter.post("/menu/:menuId/add-item", addMenuItem);
adminRouter.delete("/menu/:menuId/item/:itemId", deleteMenuItem);

export default adminRouter;
