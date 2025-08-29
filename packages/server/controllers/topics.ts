import { Request, Response } from 'express';
import { col, fn } from 'sequelize';

import { Comment } from '../models/comment';
import { Topic } from '../models/topic';

export class TopicController {
  static getAll(req: Request, res: Response) {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;

    Promise.all([
      Topic.findAll({
        limit,
        offset,
        attributes: {
          include: [[fn('COUNT', col('comments.id')), 'commentsCount']],
        },
        include: [
          {
            model: Comment,
            as: 'comments',
            attributes: [],
            required: false,
            order: [['id', 'DESC']],
          },
          {
            model: Comment,
            as: 'lastComment',
            separate: true,
            limit: 1,
            order: [['createdAt', 'DESC']],
            required: false,
          },
        ],
        group: ['Topic.id'],
        order: [['id', 'ASC']],
        subQuery: false,
      }),
      Topic.count(),
    ])
      .then(([rawTopics, count]) => {
        const topics = rawTopics.map((topic) => {
          const plainTopic = topic.toJSON() as Topic & {
            commentsCount: string;
            lastComment: Comment[];
          };

          return {
            ...plainTopic,
            lastComment: plainTopic.lastComment?.[0] || null,
            commentsCount: Number(plainTopic.commentsCount),
          };
        });

        return res.json({ topics, count });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }

  static create(req: Request, res: Response) {
    const ownerId = Number(req.body.ownerId);
    const { name, ownerLogin } = req.body;

    Topic.create({ ownerId, name, ownerLogin })
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
