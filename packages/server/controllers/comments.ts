import { NextFunction, Request, Response } from 'express';
import { ProtectedRequest } from 'ProtectedRequest';

import { createdCode } from '../constants/createdCode';
import { Comment } from '../models/comment';

export class CommentController {
  static getAll(req: Request, res: Response, next: NextFunction) {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const topicId = Number(req.query.topicId);

    Comment.findAndCountAll({
      where: {
        topicId: topicId,
      },
      limit,
      offset,
      order: [['id', 'ASC']],
    })
      .then(({ count, rows: comments }) => res.json({ comments, count }))
      .catch(next);
  }

  static create(req: ProtectedRequest, res: Response, next: NextFunction) {
    const topicId = Number(req.body.topicId);
    const { text } = req.body;
    const replyCommentId = req.body.replyCommentId ? Number(req.body.replyCommentId) : null;

    const { id: ownerId, login: ownerLogin } = req.user;

    Comment.create({
      ownerId,
      topicId,
      text,
      ownerLogin,
      replyCommentId,
    })
      .then((comment) => res.status(createdCode).json(comment))
      .catch(next);
  }
}
