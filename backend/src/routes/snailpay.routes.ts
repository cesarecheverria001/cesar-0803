import { Router } from 'express';

import { charge } from '../controllers/snailpay.controller';

const router = Router();

router.post('/charge', charge);

export default router;