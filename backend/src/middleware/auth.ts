import { NextFunction, Response } from 'express'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest, JwtPayload } from '../types/auth'

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token:string;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]; //Authorization: [Bearer, <token>]
            const secret = process.env.JWT_SECRET as string;
            const decoded = jwt.verify(token, secret) as JwtPayload;

            const user = await User.findById(decoded.id).select('-password')
            if(!user){
                res.status(401).json({message: "Usuario no encontrado"})
                return;
            } 

            req.user = user
            return next();
        } catch (error:any) {
            console.log(error.message || "Error verificando el token");
            res.status(401).json({message: "Sin autorizacion, falla en el token"});
            return;
        }
    }
    res.status(401).json({message: "Sin autorizacion, falla en el token"})
}