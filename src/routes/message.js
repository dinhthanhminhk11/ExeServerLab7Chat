import { Router } from 'express';

import controllerMessage from '../controller/message';

const router = Router();

router.get('/getUser/:id', controllerMessage.findUser);
router.post('/addmsg', controllerMessage.addMessage);
router.get('/getmsg/:send&:sendTo', controllerMessage.findMessageUser);

export default router;