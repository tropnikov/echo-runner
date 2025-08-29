import { Request, Response } from 'express';

import { Comment } from '../models/comment';

export class CommentController {
  static getAll(req: Request, res: Response) {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const topicId = Number(req.query.topicId);

    Comment.findAll({
      where: {
        topicId: topicId,
      },
      limit,
      offset,
      order: [['id', 'ASC']],
    })
      .then((comments) => res.json(comments))
      .catch((err) => res.status(500).json({ message: err.message }));
  }

  static create(req: Request, res: Response) {
    const ownerId = Number(req.body.ownerId);
    const topicId = Number(req.body.topicId);
    const text = req.body.text;
    const replyCommentId = req.body.replyCommentId ? Number(req.body.replyCommentId) : null;

    Comment.create({
      ownerId,
      topicId,
      text,
      replyCommentId,
    })
      .then((comment) => res.status(201).json(comment))
      .catch((err) => res.status(500).json({ message: err.message }));
  }
}
