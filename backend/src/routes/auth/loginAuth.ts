import { Request, Response, Router } from 'express';
import User, { UserInterface } from '../../models/user';
import generateToken from './generateJWT';

const router: Router = Router();

router.post('/login', async (req: Request, res: Response):Promise<void> => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({message: "Por favor rellene todos los campos"})
            return;
        }

        const user = await User.findOne({email}) as UserInterface;

        if(!user || !(await (user as UserInterface).matchPassword(password))){
            res.status(400).json({message: "Credenciales invalidas"})
            return;
        }
        const token = generateToken({ id: user.id });
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token,
        })

    } catch (error:any) {
        res.status(500).json({message: error.message|| "Error en el servidor al iniciar sesion"})
    }

})

export default router;

