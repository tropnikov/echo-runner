import { NextFunction, Request, Response } from 'express';
import { ProtectedRequest } from 'ProtectedRequest';
import { col, fn } from 'sequelize';

import { createdCode } from '../constants/createdCode';
import { topicNotFoundErrorMessage } from '../constants/topicNotFoundErrorMessage';
import NotFoundError from '../errors/NotFoundError';
import { Comment } from '../models/comment';
import { Topic } from '../models/topic';

export class TopicController {
  static getAll(req: Request, res: Response, next: NextFunction) {
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
      .catch(next);
  }

  static create(req: ProtectedRequest, res: Response, next: NextFunction) {
    const { name } = req.body;

    const { id: ownerId, login: ownerLogin } = req.user;

    Topic.create({ ownerId, name, ownerLogin })
      .then((topic) => res.status(createdCode).json(topic))
      .catch(next);
  }

  static getById(req: Request, res: Response, next: NextFunction) {
    const topicId = Number(req.params.topicId);

    Topic.findByPk(topicId)
      .then((topic) => {
        if (!topic) {
          throw new NotFoundError(topicNotFoundErrorMessage);
        }

        return res.json(topic);
      })
      .catch(next);
  }
}
