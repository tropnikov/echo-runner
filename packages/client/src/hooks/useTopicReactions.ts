import { useCallback, useEffect, useMemo, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { useAppSelector } from '@/redux/store';
import { GetTopicReactionsResponse } from '@/types/Forum';

export const useTopicReactions = (topicId: number) => {
  const [reactions, setReactions] = useState<GetTopicReactionsResponse['reactions']>([]);
  const [myEmoji, setMyEmoji] = useState<string | null>(null);
  const user = useAppSelector((s) => s.auth.user);
  const ownerId = user?.id;
  const ownerLogin = user?.login ?? undefined;

  const emojis = ['👍', '❤️', '😂', '😮', '👎'];

  useEffect(() => {
    const loadTopicReactions = async () => {
      const { reactions, myEmoji } = await topicApi.getTopicReactions(topicId, ownerId);
      setReactions(reactions);
      setMyEmoji(myEmoji);
    };
    if (topicId) {
      loadTopicReactions();
    }
  }, [topicId, ownerId]);

  const setReaction = useCallback(
    async (emoji: string) => {
      if (!ownerId) return;
      const result = await topicApi.setTopicReaction(topicId, emoji, { ownerId, ownerLogin });
      setReactions((prev) => {
        const map = new Map<string, number>(prev.map((r) => [r.emoji, r.count]));

        if (myEmoji) {
          map.set(myEmoji, Math.max(0, (map.get(myEmoji) ?? 1) - 1));
        }

        if (result.deleted) {
          return Array.from(map.entries()).map(([e, c]) => ({ emoji: e, count: c }));
        }

        map.set(result.emoji, (map.get(result.emoji) ?? 0) + 1);

        return Array.from(map.entries()).map(([e, c]) => ({ emoji: e, count: c }));
      });
      setMyEmoji(result.deleted ? null : result.emoji);
    },
    [topicId, ownerId, ownerLogin, myEmoji],
  );

  const reactionMap = useMemo(() => Object.fromEntries(reactions.map((r) => [r.emoji, r.count])), [reactions]);

  return { reactions, myEmoji, setReaction, reactionMap, emojis };
};
