import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { GetTopicResponse } from '@/types/Forum';

export const useTopicList = (pageNumber: number, pageSize: number) => {
  const [topics, setTopics] = useState<GetTopicResponse[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadTopics = async () => {
    try {
      setIsLoading(true);
      const { topics, count } = await topicApi.getAllTopics(pageNumber * pageSize, pageSize);
      setTopics(topics);
      setCount(count);
    } catch (error) {
      console.error('Error loading topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, [pageNumber, pageSize]);

  return { topics, loadTopics, count, isLoading };
};
