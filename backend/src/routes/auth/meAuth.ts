import { Request, Response, Router } from 'express';
import { protect } from '../../middleware/auth';

const router: Router = Router();

router.get("/me", protect, async (req: Request, res: Response) => {
    res.status(200).json(req.user);
})