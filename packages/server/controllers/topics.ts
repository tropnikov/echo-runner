import { NextFunction, Request, Response } from 'express';
import { ProtectedRequest } from 'ProtectedRequest';
import { col, fn } from 'sequelize';

import { createdCode } from '../constants/createdCode';
import { topicNotFoundErrorMessage } from '../constants/topicNotFoundErrorMessage';
import NotFoundError from '../errors/NotFoundError';
import { Comment } from '../models/comment';
import { Reaction } from '../models/reaction';
import { Topic } from '../models/topic';

export class TopicController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;

    try {
      const [rawTopics, count] = await Promise.all([
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
      ]);

      const topicIds = rawTopics.map((topic) => topic.id);
      const reactions = await Reaction.findAll({
        where: { topicId: topicIds },
        attributes: ['topicId', 'emoji', [fn('COUNT', col('emoji')), 'count']],
        group: ['topicId', 'emoji'],
        order: [[fn('COUNT', col('emoji')), 'DESC']],
      });

      const reactionsByTopic = reactions.reduce(
        (acc, reaction) => {
          const plainReaction = reaction.toJSON() as Reaction & { count: string };
          const topicId = plainReaction.topicId;

          if (!acc[topicId]) {
            acc[topicId] = [];
          }

          acc[topicId].push({
            emoji: plainReaction.emoji,
            count: Number(plainReaction.count),
          });

          return acc;
        },
        {} as Record<number, Array<{ emoji: string; count: number }>>,
      );

      const topics = rawTopics.map((topic) => {
        const plainTopic = topic.toJSON() as Topic & {
          commentsCount: string;
          lastComment: Comment[];
        };

        return {
          ...plainTopic,
          lastComment: plainTopic.lastComment?.[0] || null,
          commentsCount: Number(plainTopic.commentsCount),
          reactions: reactionsByTopic[topic.id] || [],
        };
      });

      res.json({ topics, count });
    } catch (error) {
      next(error);
    }
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
