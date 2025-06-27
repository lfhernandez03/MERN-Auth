import jwt from 'jsonwebtoken'
import { JwtPayload } from '../../middleware/auth';

const generateToken = (id: JwtPayload) => {
    const secret = process.env.JWT_SECRET as string;
    jwt.sign({id}, secret, {expiresIn: "30d"});
    return;
}

export default generateToken;