import { Router } from 'express'
import { googleLogin } from '../../controllers/auth.controller';

const authRouter = Router();

authRouter.get("/google", googleLogin);

export default authRouter;