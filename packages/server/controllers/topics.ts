import { Request, Response } from 'express';

import { Comment } from '../models/comment';
import { Topic } from '../models/topic';

export class TopicController {
  static getAll(req: Request, res: Response) {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;

    Topic.findAll({
      limit,
      offset,
      include: [
        {
          model: Comment,
          separate: true,
          limit: 1,
          order: [['id', 'DESC']],
        },
      ],
      order: [['id', 'ASC']],
    })
      .then((topics) => res.json(topics))
      .catch((err) => res.status(500).json({ message: err.message }));
  }

  static create(req: Request, res: Response) {
    const ownerId = Number(req.body.ownerId);
    const name = req.body.name;

    Topic.create({ ownerId, name })
      .then((topic) => res.status(201).json(topic))
      .catch((err) => res.status(500).json({ message: err.message }));
  }

  static getById(req: Request, res: Response) {
    const topicId = Number(req.params.topicId);

    Topic.findByPk(topicId)
      .then((topic) => {
        if (!topic) return res.status(404).json({ message: 'Not found' });

        return res.status(200).json(topic);
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
}
