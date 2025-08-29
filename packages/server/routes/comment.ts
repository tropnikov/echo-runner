import { Router } from 'express';

import { createCommentValidation } from '../constants/createCommentValidation';
import { getCommentsValidation } from '../constants/getCommentsValidation';
import { CommentController } from '../controllers/comments';

const commentRouter = Router();

commentRouter.get('/', getCommentsValidation, CommentController.getAll);
commentRouter.post('/', createCommentValidation, CommentController.create);

export default commentRouter;
