import { Router } from 'express';

import AuthController from '../controller/AuthController';

const router = new Router();

router.post('/api/auth', AuthController.authenticate);

export default router;
