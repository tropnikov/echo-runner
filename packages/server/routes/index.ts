import { Router } from 'express';

import commentRouter from './comment';
import topicRouter from './topic';

const router = Router();

router.use('/comments', commentRouter);
router.use('/topics', topicRouter);

export default router;
