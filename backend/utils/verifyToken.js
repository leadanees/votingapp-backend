import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    const token = req.cookies.accessToken;
    //const token = req.cookie.accessToken;
    if(!token){
        return res.status(401).json({success : false , message : "you are not authorize"});
    }

    //if token exist the verify user and Admin
    jwt.verify(token,process.env.JWT_SECRETE_KEY,(err,user) => {
        if(err){
            return res.status(401).json({success : false , message : "Token is invalid"})
        }
        req.user = user;
        next();
    });
};

export const verifyUser = (req,res,next) =>{
    verifyToken(req,res,next,() => {
        if(req.user.id === req.param.id || req.user.role === 'admin'){
            next();
        }else{
            return res.status(401).json({success : false , message : "you are not authorize"})
        }
    })
}

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next,() => {
        if(req.user.role === "admin"){
            next();
        }
        else{
            return res.status(401).json({success : false , message : "you are not authorize"})
        }
    })
}