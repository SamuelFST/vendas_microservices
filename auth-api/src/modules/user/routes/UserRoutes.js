import { Router } from 'express';

import UserController from '../controller/UserController';

const router = new Router();

router.get('/api/users/:email', UserController.findbyEmail);

export default router;
