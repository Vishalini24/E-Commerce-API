import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next)=>{
    //1.Read the token
    const token = req.headers['authorization'];
    //2.If no token,return error
    if(!token){
        return res.status(401).send('Unauthorized');
    }

    //3. check if token is valid
    try{
        const payload = jwt.verify(token,"QlTNVfhoRBVDM2QyXrRyMkfIjSeZF7uZ");
        req.userID = payload.userID;
    }catch(err){
        //4. return error
        return res.status(401).send('Unauthorized');
    }
    

    //5.call next middleware
    next();
}

export  default jwtAuth;