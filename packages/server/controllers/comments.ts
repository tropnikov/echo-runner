import { NextFunction, Request, Response } from 'express';
import { ProtectedRequest } from 'ProtectedRequest';

import { createdCode } from '../constants/createdCode';
import { parentCommentNotFoundErrorMessage } from '../constants/parentCommentNotFoundErrorMessage';
import { topicNotFoundErrorMessage } from '../constants/topicNotFoundErrorMessage';
import NotFoundError from '../errors/NotFoundError';
import { Comment } from '../models/comment';
import { Topic } from '../models/topic';

export class CommentController {
  static getAll(req: Request, res: Response, next: NextFunction) {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const topicId = Number(req.query.topicId);

    Topic.findByPk(topicId)
      .then((topic) => {
        if (!topic) {
          throw new NotFoundError(topicNotFoundErrorMessage);
        }

        return Comment.findAndCountAll({
          where: {
            topicId: topicId,
          },
          limit,
          offset,
          order: [['id', 'ASC']],
        });
      })
      .then(({ count, rows: comments }) => res.json({ comments, count }))
      .catch(next);
  }

  static create(req: ProtectedRequest, res: Response, next: NextFunction) {
    const { replyCommentId = null, text, topicId } = req.body;

    const { id: ownerId, login: ownerLogin } = req.user;

    Topic.findByPk(topicId)
      .then((topic) => {
        if (!topic) {
          throw new NotFoundError(topicNotFoundErrorMessage);
        }

        if (replyCommentId) {
          return Comment.findByPk(replyCommentId).then((parentComment) => {
            if (!parentComment) {
              throw new NotFoundError(parentCommentNotFoundErrorMessage);
            }
            return topic;
          });
        }

        return topic;
      })
      .then(() =>
        Comment.create({
          ownerId,
          topicId,
          text,
          ownerLogin,
          replyCommentId,
        }),
      )
      .then((comment) => res.status(createdCode).json(comment))
      .catch(next);
  }
}
