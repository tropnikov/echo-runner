import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';
import commentRouter from './comment';
import reactionRouter from './reaction';
import topicRouter from './topic';
import userThemeRouter from './userTheme';

const router = Router();

router.use('/comments', authMiddleware, commentRouter);
router.use('/topics', authMiddleware, topicRouter);
router.use('/theme', userThemeRouter);
router.use('/topics/:topicId/reactions', authMiddleware, reactionRouter);

export default router;
