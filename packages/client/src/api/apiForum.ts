import { baseBackEndUrl } from '@/constants/apiEndpoint';
import { GetTopicListResponse, GetTopicResponse } from '@/types/Forum';

export const topicApi = {
  getAllTopics: async (pageNumber: number, pageSize: number): Promise<GetTopicListResponse[]> => {
    const response = await fetch(`${baseBackEndUrl}/topics?pageNumber=${pageNumber}&pageSize=${pageSize}`);

    if (!response.ok) {
      throw new Error('Failed to fetch topics');
    }
    return response.json();
  },

  getTopicById: async (id: number): Promise<GetTopicResponse> => {
    const response = await fetch(`${baseBackEndUrl}/topics/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch topic');
    }
    return response.json();
  },

  createTopic: async (topic: GetTopicResponse): Promise<GetTopicResponse> => {
    const response = await fetch(`${baseBackEndUrl}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topic),
    });

    if (!response.ok) {
      throw new Error('Failed to create topic');
    }

    return response.json();
  },

  deleteTopic: async (id: number): Promise<void> => {
    const response = await fetch(`${baseBackEndUrl}/topics/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete topic');
    }
  },
};
