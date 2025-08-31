import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { GetTopicResponse } from '@/types/Forum';

export const useTopicList = (pageNumber: number, pageSize: number) => {
  const [topics, setTopics] = useState<GetTopicResponse[]>([]);
  const [count, setCount] = useState(0);

  const loadTopics = async () => {
    try {
      const { topics, count } = await topicApi.getAllTopics(pageNumber * pageSize, pageSize);
      setTopics(topics);
      setCount(count);
    } catch (error) {
      console.error('Error loading topics:', error);
    }
  };

  useEffect(() => {
    loadTopics();
  }, [pageNumber, pageSize]);

  return { topics, loadTopics, count };
};
