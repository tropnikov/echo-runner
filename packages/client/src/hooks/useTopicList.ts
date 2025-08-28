import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { getDefaultTopic, GetTopicListResponse, GetTopicResponse } from '@/types/Forum';

export const useTopicList = (pageNumber: number, pageSize: number) => {
  const [topics, setTopics] = useState<GetTopicListResponse[]>([]);

  const loadTopics = async (pageNumber: number, pageSize: number) => {
    try {
      const data = await topicApi.getAllTopics(pageNumber, pageSize);
      setTopics(data);
    } catch (error) {
      console.error('Error loading topics:', error);
    }
  };

  useEffect(() => {
    loadTopics(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  return { topics, loadTopics };
};

const handleCreateTopic = async (title: string, content: string) => {
  try {
    const topic: GetTopicResponse = getDefaultTopic();
    topic.name = title;

    const newTopic = await topicApi.createTopic(topic);
  } catch (error) {
    console.error('Error creating topic:', error);
  }
};
