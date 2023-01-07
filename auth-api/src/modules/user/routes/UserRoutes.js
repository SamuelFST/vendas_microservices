import { Router } from 'express';

import UserController from '../controller/UserController';
import authenticated from '../../../middlewares/auth/authenticated';

const router = new Router();

router.get('/api/users/:email', authenticated, UserController.findbyEmail);

export default router;
