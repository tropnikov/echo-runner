import { useCallback, useEffect, useMemo, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { GetTopicReactionsResponse } from '@/types/Forum';

export const useTopicReactions = (topicId: number) => {
  const [reactions, setReactions] = useState<GetTopicReactionsResponse['reactions']>([]);
  const [myEmoji, setMyEmoji] = useState<string | null>(null);

  const emojis = ['👍', '❤️', '😂', '😮', '👎'];

  useEffect(() => {
    const loadTopicReactions = async () => {
      const { reactions, myEmoji } = await topicApi.getTopicReactions(topicId);
      setReactions(reactions);
      setMyEmoji(myEmoji);
    };
    if (topicId) {
      loadTopicReactions();
    }
  }, [topicId]);

  const setReaction = useCallback(
    async (emoji: string) => {
      const result = await topicApi.setTopicReaction(topicId, emoji);
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
    [topicId, myEmoji],
  );

  const reactionMap = useMemo(() => Object.fromEntries(reactions.map((r) => [r.emoji, r.count])), [reactions]);

  return { reactions, myEmoji, setReaction, reactionMap, emojis };
};
