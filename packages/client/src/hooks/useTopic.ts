import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { getDefaultTopic, GetTopicResponse } from '@/types/Forum';

export const useTopic = (topicId: number) => {
  const [topic, setTopic] = useState<GetTopicResponse>(getDefaultTopic());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTopicById = async () => {
      try {
        setIsLoading(true);
        const data = await topicApi.getTopicById(topicId);
        setTopic(data);
      } catch (error) {
        console.error(`Error loading topic:${topicId}`, error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTopicById();
  }, [topicId]);

  return { topic, isLoading };
};
