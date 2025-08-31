import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { getDefaultTopic, GetTopicResponse } from '@/types/Forum';

export const useTopic = (topicId: number) => {
  const [topic, setTopic] = useState<GetTopicResponse>(getDefaultTopic());

  useEffect(() => {
    const loadTopicById = async (topicId: number) => {
      try {
        const data = await topicApi.getTopicById(topicId);
        setTopic(data);
      } catch (error) {
        console.error(`Error loading topic:${topicId}`, error);
      }
    };
    loadTopicById(topicId);
  }, [topicId]);

  return { topic };
};
