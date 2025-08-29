import { Request, Response } from 'express';

import { Comment } from '../models/comment';

export class CommentController {
  static getAll(req: Request, res: Response) {
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
      .then(({ count, rows }) => res.json({ comments: rows, count }))
      .catch((err) => res.status(500).json({ message: err.message }));
  }

  static create(req: Request, res: Response) {
    const ownerId = Number(req.body.ownerId);
    const topicId = Number(req.body.topicId);
    const { text, ownerLogin } = req.body;
    const replyCommentId = req.body.replyCommentId ? Number(req.body.replyCommentId) : null;

    Comment.create({
      ownerId,
      topicId,
      text,
      ownerLogin,
      replyCommentId,
    })
      .then((comment) => res.status(201).json(comment))
      .catch((err) => res.status(500).json({ message: err.message }));
  }
}
