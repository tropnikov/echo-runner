import { Response } from 'express';
import { ProtectedRequest } from 'ProtectedRequest';
import { col, fn, literal } from 'sequelize';

import { Reaction } from '../models/reaction';

export class ReactionController {
  static async upsert(req: ProtectedRequest, res: Response) {
    const topicId = Number(req.params.topicId);
    const ownerId = req.user.id;
    const { emoji } = req.body as { emoji: string };

    try {
      const existing = await Reaction.findOne({ where: { topicId, ownerId } });

      if (existing && existing.emoji === emoji) {
        const deletedEmoji = existing.emoji;
        await existing.destroy();
        return res.status(200).json({ deleted: true, emoji: deletedEmoji });
      }

      if (existing) {
        existing.emoji = emoji;
        await existing.save();
        return res.status(200).json({ deleted: false, emoji });
      }

      await Reaction.create({ topicId, ownerId, emoji });
      return res.status(201).json({ deleted: false, emoji });
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async remove(req: ProtectedRequest, res: Response) {
    const topicId = Number(req.params.topicId);
    const ownerId = Number(req.user?.id);

    try {
      const deleted = await Reaction.destroy({ where: { topicId, ownerId } });
      return res.status(deleted ? 200 : 204).send(deleted ? { deleted } : undefined);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async getTopicReactions(req: ProtectedRequest, res: Response) {
    const topicId = Number(req.params.topicId);
    const ownerId = req.user.id;

    try {
      // Один запрос для получения всех данных
      const rows = await Reaction.findAll({
        where: { topicId },
        attributes: [
          'emoji',
          [fn('COUNT', col('emoji')), 'count'],
          [fn('MAX', literal(`CASE WHEN "owner_id" = ${ownerId} THEN 1 ELSE 0 END`)), 'isMyReaction'],
        ],
        group: ['emoji'],
        order: [[fn('COUNT', col('emoji')), 'DESC']],
      });

      const reactions = rows.map((r) => {
        const plain = r.toJSON() as Reaction & { count: string; isMyReaction: string };
        return {
          emoji: plain.emoji,
          count: Number(plain.count),
          isMyReaction: Number(plain.isMyReaction) === 1,
        };
      });

      if (!ownerId) {
        return res.status(200).json({ reactions });
      }

      const myReaction = reactions.find((r) => r.isMyReaction);
      const myEmoji = myReaction?.emoji || null;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cleanReactions = reactions.map(({ isMyReaction, ...rest }) => rest);

      return res.status(200).json({ reactions: cleanReactions, myEmoji });
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }
}
