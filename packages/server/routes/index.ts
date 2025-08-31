import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';
import commentRouter from './comment';
import topicRouter from './topic';

const router = Router();

router.use('/comments', authMiddleware, commentRouter);
router.use('/topics', authMiddleware, topicRouter);

export default router;
