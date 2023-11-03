//Manage routes to product controller

import express from 'express';
import { cartController } from './cart.controller.js';


//Initialize express router
const cartRouter = express.Router();

const cartsController = new cartController();

cartRouter.delete("/:id",cartsController.delete);

cartRouter.post("/",cartsController.add);
cartRouter.get("/",cartsController.get);

export default cartRouter;