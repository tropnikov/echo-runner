import { Request, Response } from 'express';
import { col, fn } from 'sequelize';

import { Reaction } from '../models/reaction';

export class ReactionController {
  static async upsert(req: Request, res: Response) {
    const topicId = Number(req.params.topicId);
    const ownerId = Number((req as any).user?.id);
    const { emoji, ownerLogin } = req.body as { emoji: string; ownerLogin?: string };

    try {
      const existing = await Reaction.findOne({ where: { topicId, ownerId } });

      if (existing && existing.emoji === emoji) {
        const deletedEmoji = existing.emoji;
        await existing.destroy();
        return res.status(200).json({ deleted: true, emoji: deletedEmoji });
      }

      if (existing) {
        existing.emoji = emoji;
        if (ownerLogin) existing.ownerLogin = ownerLogin;
        await existing.save();
        return res.status(200).json({ deleted: false, emoji });
      }

      await Reaction.create({ topicId, ownerId, ownerLogin: ownerLogin || null, emoji });
      return res.status(201).json({ deleted: false, emoji });
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async remove(req: Request, res: Response) {
    const topicId = Number(req.params.topicId);
    const ownerId = Number((req as any).user?.id);

    try {
      const deleted = await Reaction.destroy({ where: { topicId, ownerId } });
      return res.status(deleted ? 200 : 204).send(deleted ? { deleted } : undefined);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async getTopicReactions(req: Request, res: Response) {
    const topicId = Number(req.params.topicId);
    const ownerId = (req as any).user?.id as number | undefined;

    try {
      const rows = await Reaction.findAll({
        where: { topicId },
        attributes: ['emoji', [fn('COUNT', col('emoji')), 'count']],
        group: ['emoji'],
        order: [[fn('COUNT', col('emoji')), 'DESC']],
      });

      const reactions = rows.map((r) => {
        const plain = r.toJSON() as Reaction & { count: string };
        return { emoji: plain.emoji, count: Number((plain as unknown as { count: string }).count) };
      });

      if (!ownerId) {
        return res.status(200).json({ reactions });
      }

      const mine = await Reaction.findOne({ where: { topicId, ownerId: ownerId } });
      const myEmoji = mine?.emoji || null;

      return res.status(200).json({ reactions, myEmoji });
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }
}
