import { baseUrlAPI_dev } from '@/constants/apiEndpoint';
import { GetCommentResponse, GetTopicResponse } from '@/types/Forum';

export const topicApi = {
  getAllTopics: async (pageNumber: number, pageSize: number): Promise<GetTopicResponse[]> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics?offset=${pageNumber}&limit=${pageSize}`);

    if (!response.ok) {
      throw new Error('Failed to fetch topics');
    }
    return response.json();
  },

  getTopicById: async (id: number): Promise<GetTopicResponse> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch topic');
    }
    return response.json();
  },

  createTopic: async (topic: GetTopicResponse): Promise<GetTopicResponse> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: topic.name, ownerId: topic.ownerId, owner_login: topic.ownerLogin }),
    });

    if (!response.ok) {
      throw new Error('Failed to create topic');
    }

    return response.json();
  },

  deleteTopic: async (id: number): Promise<void> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete topic');
    }
  },

  getTopicComments: async (topic_id: number, comment_start: number, size: number): Promise<GetCommentResponse[]> => {
    const response = await fetch(
      `${baseUrlAPI_dev}/comments?offset=${comment_start}&limit=${size}&topicId=${topic_id}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch topics');
    }
    return response.json();
  },

  createComment: async (comment: GetCommentResponse): Promise<GetCommentResponse> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: comment.text,
        ownerId: comment.ownerId,
        topicId: comment.topicId,
        replyCommentId: comment.replyCommentId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create topic');
    }

    return response.json();
  },
};
