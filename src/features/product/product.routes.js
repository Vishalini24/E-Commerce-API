//Manage routes to product controller

import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

//Initialize express router
const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/rate",productController.rateProduct);

//localhost:4000/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get("/filter",productController.filterProducts);


//All the paths to controller methods
//localhost:4000/api/products - it has already passed this path enter remaining path in router.get
productRouter.get("/",productController.getAllProducts);
productRouter.post("/",upload.single('imageUrl'),productController.addProduct);
productRouter.get("/:id",productController.getOneProduct);


export default productRouter;