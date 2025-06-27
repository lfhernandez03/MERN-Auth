import { Request, Response, Router } from 'express';
import User from '../../models/user';
import generateToken from './generateJWT';

const router: Router = Router();

router.post('/register', async (req: Request, res: Response):Promise<void> => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            res.status(400).json({message: "Por favor rellene todos los campos"})
            return;
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(500).json({message: "El usuario ya existe"})
            return;
        }

        const user = await User.create({username, email, password});
        const token = generateToken(user.id);
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        })

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
});

export default router;