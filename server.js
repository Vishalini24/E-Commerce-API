import express from 'express';
import  swagger from 'swagger-ui-express';
import cors from 'cors';

import productRouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';
import apiDocs from './swagger.json' assert {type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
  
    //Create server
    const server = express();

    //CORS policy configuration
    //In order to allow all requests you can use '*' in place of the url
    // server.use((req,res,next)=>{
    //     res.header('Access-Control-Allow-Origin','http://127.0.0.1:5500');
    //     res.header('Access-Control-Allow-Headers','*');
    //     res.header('Access-Control-Allow-Methods','*');
    //     //return ok for preflight request
    //     if(req.method == "OPTIONS"){
    //         return res.sendStatus(200);
    //     }
    //     next();
    // });



    //Use CORS library for configuration
    var corsOptions = {
        origin: "http://127.0.0.1:5500"
    }
    server.use(cors(corsOptions));

    //use body-parser
    server.use(bodyParser.json());

    //for all requests  related to product , redirect to product routes.
    //localhost:4000/api/products

    //swagger api
    // if it is bearer token - Bearer <token>
    server.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

    server.use(loggerMiddleware);


    server.use("/api/products",jwtAuth,productRouter);
    server.use("/api/cart",jwtAuth,cartRouter)
    server.use("/api/users",userRouter);


    //Default request handler
    server.get("/",(req,res)=>{
        res.send('Welcome to Ecommerce APIs');
    })

    //Error handler middleware
    server.use((err,req,res,next)=>{
        console.log(err);
        if(err instanceof ApplicationError){
            res.status(err.code).send(err.message);
        }
        res.status(500).send("Something went wrong. Please try later");
    });

    //If none of the above routes match - 404 requests (Keep it at the end)
    server.use((req,res)=>{
        res.status(404).send('API not found.Please check our documentation for more information at localhost:4000/api-docs');
    });

    //Specify port
    server.listen(4000, ()=>{
        console.log('Server is listening on port 4000');
    })