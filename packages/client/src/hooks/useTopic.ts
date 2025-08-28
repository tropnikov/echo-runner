import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { getDefaultTopic, GetTopicResponse } from '@/types/Forum';

export const useTopic = (id: number, comment_start: number, size: number) => {
  const [topic, setTopic] = useState<GetTopicResponse>(getDefaultTopic());

  useEffect(() => {
    const loadTopicById = async (id: number) => {
      try {
        const data = await topicApi.getTopicById(id);
        setTopic(data);
      } catch (error) {
        console.error(`Error loading topic:${id}`, error);
      }
    };

    loadTopicById(id);
  }, [id, comment_start, size]);

  return { topic };
};
