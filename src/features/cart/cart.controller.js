import cartModel from "./cart.model.js";
import UserModel   from"../user/user.model.js";
import ProductModel from "../product/product.model.js";

export class cartController{


    add(req,res){
        const {productID, quantity} = req.query;
        const products = ProductModel.getAll();
        const product = products.filter((p)=>p.id == productID);
        if(!product){
            res.status(400).send('Product not Found');
        }
        const userID = req.userID;  
        const users = UserModel.getAll();
        const user = users.filter((u)=>u.id == userID);
        if(!user){
            res.status(400).send('User not Found');
        }
        console.log(productID,userID,quantity);
        const addedtoCart = cartModel.add(productID,userID,quantity);
        if(addedtoCart){
            res.status(201).send('Cart is updated');
        }
    }

    get(req,res){
        const userID = req.userID;
        const items = cartModel.get(userID);
        return res.status(200).send(items);
    }

    delete(req,res){
        const userID = req.userID;
        const cartItemId = req.params.id;
        const error = cartModel.delete(cartItemId,userID);
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).send('Item removed from cart successfully')
    }
}