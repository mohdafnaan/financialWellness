import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

function middleware(req,res,next){
    try {
        let token = req.headers.authorization?.split(' ')[1];
        if(!token){
            res.status(400).json({msg: "invalid token"})
        }
        console.log(process.env.JWT_SECKEY)
        const decode = jwt.verify(token,process.env.JWT_SECKEY);
        req.user = decode;
        next()
    } catch (error) {
        console.log(error)
    }
}
export default middleware