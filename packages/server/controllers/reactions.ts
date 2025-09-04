import { Request, Response } from 'express';
import { col, fn } from 'sequelize';

import { Reaction } from '../models/reaction';

export class ReactionController {
  static async upsert(req: Request, res: Response) {
    const topicId = req.params.topicId ? Number(req.params.topicId) : Number(req.body.topicId);
    const ownerId = Number(req.body.ownerId);
    const { emoji, ownerLogin } = req.body as { emoji: string; ownerLogin?: string };

    try {
      const existing = await Reaction.findOne({ where: { topicId, ownerId } });

      // toggle off: same emoji -> delete
      if (existing && existing.emoji === emoji) {
        await existing.destroy();
        return res.status(200).json({ deleted: true });
      }

      // update to new emoji
      if (existing) {
        existing.emoji = emoji;
        if (ownerLogin) existing.ownerLogin = ownerLogin;
        await existing.save();
        return res.status(200).json(existing);
      }

      // create new reaction
      const created = await Reaction.create({ topicId, ownerId, ownerLogin: ownerLogin || null, emoji });
      return res.status(201).json(created);
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }

  static async remove(req: Request, res: Response) {
    const topicId = Number(req.params.topicId);
    const ownerId = Number(req.body.ownerId);

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
    const maybeOwnerId = req.query.ownerId ? Number(req.query.ownerId) : undefined;

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

      if (!maybeOwnerId) {
        return res.status(200).json({ reactions });
      }

      const mine = await Reaction.findOne({ where: { topicId, ownerId: maybeOwnerId } });
      const myEmoji = mine?.emoji || null;

      return res.status(200).json({ reactions, myEmoji });
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }
}
