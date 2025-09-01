import { Router } from 'express';

import { createCommentValidation } from '../constants/createCommentValidation';
import { getCommentsValidation } from '../constants/getCommentsValidation';
import { CommentController } from '../controllers/comments';
import { withAuth } from '../utils/withAuth';

const commentRouter = Router();

commentRouter.get('/', getCommentsValidation, CommentController.getAll);
commentRouter.post('/', createCommentValidation, withAuth(CommentController.create));

export default commentRouter;
