import UserModel  from "../user/user.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class ProductModel{

    constructor(id,name,desc,price,imageUrl,category,sizes){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
    }

    static getAll(){
        return products;
    }

    static add(product){
        product.id = products.length+1;
        products.push(product);
        return product;
    }   

    static get(id){
        const product = products.find((p)=>{
            return p.id == id;
        });
        return product;
    }

    static filter(minPrice,maxPrice,category){
        const ans = products.filter((product) => {
            return (!minPrice || product.price >= minPrice )&& (!maxPrice || product.price <= maxPrice)&& (!category || product.category == category);
        });
    
        return ans;
    }

    static rateProduct(userID , productID, rating){
        //1. Validate user and product
        const user = UserModel.getAll().find((u)=>u.id == userID);
        if(!user){
            throw new ApplicationError('User not Found',404);
        }
        
        //Validate Product
        const product = products.find((p)=> {
            return p.id == productID;
        });
        if(!product){
            throw new ApplicationError('Product not Found',400);
        }

        //Check if there are any ratings and if not then add ratings array
        if(!product.ratings){
            product.ratings = [];
            product.ratings.push({
                userID: userID,
                rating:rating,
            });
        }
        else{
            //check if rating is already available
            const existingRating = product.ratings.findIndex((r)=> r.userID == userID);
            if(existingRating >= 0){
                product.ratings[existingRating] = {
                    userID: userID,
                    rating:rating,
                };
            }
            else{
                product.ratings.push({
                    userID: userID,
                    rating:rating,
                });
            }
        }
    }
}

var products = [

    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1', 
         19.99, 
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Category1'),

    new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
         29.99, 
         'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
         'Category2',
         ['M','XL'],
         ),
    new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
         39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Category3',
        ['M','XL','S'],
        ),

];