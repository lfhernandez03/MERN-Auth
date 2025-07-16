import { Response, Router } from 'express';
import { protect } from '../../middleware/auth';
import { AuthenticatedRequest } from '../../types/auth';

const router: Router = Router();

router.get("/me", protect, async (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json(req.user);
})

export default router;