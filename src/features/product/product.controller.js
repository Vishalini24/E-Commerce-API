import ProductModel from "./product.model.js";


export default class ProductController{

    getAllProducts(req,res){
       const products = ProductModel.getAll();
       res.status(200).send(products);
    }

    addProduct(req,res){
      console.log(req.body);
       const {name,desc,price,sizes,category} = req.body;
       const newProduct  = {
         name,
         desc,
         price: parseFloat(price),
         imageUrl: req.file.filename,
         category,
         sizes:sizes.split(','),
       };
       const createdRecord = ProductModel.add(newProduct);
       res.status(201).send(createdRecord);
    }

    rateProduct(req,res,next){
      try{
         const userID = req.query.userID;
         const productID = req.query.productID;
         const rating = req.query.rating;
         ProductModel.rateProduct(userID,productID,rating);
         return res.status(200).send('Rating has been added successfully');
      }
      catch(err){
         next(err);
      }
     
    }

    getOneProduct(req,res){
        const id = req.params.id;
        const product =  ProductModel.get(id);
        if(!product){
         res.status(404).send('Product not Found');
        }
        else{
         res.status(200).send(product);
        }
    }

      filterProducts(req,res){
         const minPrice = req.query.minPrice;
         const maxPrice = req.query.maxPrice;
         const category = req.query.category;
         console.log(minPrice,maxPrice,category);
         const result = ProductModel.filter(minPrice,maxPrice,category);
         console.log('Result',result);
         res.status(200).send(result);
      }
    
}
