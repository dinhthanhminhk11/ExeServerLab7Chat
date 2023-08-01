import { Router } from 'express';
import user from '../controller/user';
const router = Router();
router.post('/auth' , user.loginAndRegister)
export default router;