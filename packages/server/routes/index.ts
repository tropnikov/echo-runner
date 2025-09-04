import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';
import commentRouter from './comment';
import topicRouter from './topic';
import userThemeRouter from './userTheme';

const router = Router();

router.use('/comments', authMiddleware, commentRouter);
router.use('/topics', authMiddleware, topicRouter);
router.use('/theme', userThemeRouter);

export default router;
