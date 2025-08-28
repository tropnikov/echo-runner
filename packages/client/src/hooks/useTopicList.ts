import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { GetTopicListResponse } from '@/types/Forum';

export const useTopicList = (pageNumber: number, pageSize: number) => {
  const [topics, setTopics] = useState<GetTopicListResponse[]>([]);

  useEffect(() => {
    const loadTopics = async (pageNumber: number, pageSize: number) => {
      try {
        const data = await topicApi.getAllTopics(pageNumber, pageSize);
        setTopics(data);
      } catch (error) {
        console.error('Error loading topics:', error);
      }
    };

    loadTopics(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  return { topics };
};

/*
const handleCreateTopic = async (title: string, content: string) => {
  try {
    const topic: GetTopicResponse = getDefaultTopic();
    topic.name = title;

    const newTopic = await topicApi.createTopic(topic);
    //    setTopics(prev => [...prev, newTopic]);
  } catch (error) {
    console.error('Error creating topic:', error);
  }
};
*/
