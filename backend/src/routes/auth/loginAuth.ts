import { Request, Response, Router } from 'express';
import User, { UserInterface } from '../../models/user';
import generateToken from './generateJWT';

const router: Router = Router();

router.post('/login', async (req: Request, res: Response):Promise<void> => {
    const {email, password} = req.body;
    console.log("Login attempt for:", email);

    try {
        if (!email || !password) {
            console.log("Missing fields - email:", !!email, "password:", !!password);
            res.status(400).json({message: "Por favor rellene todos los campos"})
            return;
        }

        console.log("Looking for user with email:", email);
        const user = await User.findOne({email}) as UserInterface;
        console.log("User found:", !!user);

        if(!user) {
            console.log("User not found");
            res.status(400).json({message: "Credenciales invalidas"})
            return;
        }

        console.log("Checking password...");
        const passwordMatch = await user.matchPassword(password);
        console.log("Password match:", passwordMatch);

        if(!passwordMatch) {
            console.log("Password doesn't match");
            res.status(400).json({message: "Credenciales invalidas"})
            return;
        }

        console.log("Login successful, generating token...");
        const token = generateToken(user.id);
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token,
        })

    } catch (error:any) {
        console.error("Login error:", error);
        res.status(500).json({message: error.message|| "Error en el servidor al iniciar sesion"})
    }

})

export default router;

