import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

function middleware(req, res, next) {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: "Token required" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECKEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
}
export default middleware