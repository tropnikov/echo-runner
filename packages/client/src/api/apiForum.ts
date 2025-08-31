import { baseUrlAPI_dev } from '@/constants/apiEndpoint';
import { CommentResponseWithCount, GetCommentResponse, GetTopicResponse } from '@/types/Forum';

export const topicApi = {
  getAllTopics: async (
    pageNumber: number,
    pageSize: number,
  ): Promise<{ topics: GetTopicResponse[]; count: number }> => {
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

  createTopic: async (name: string, owner_id: number, owner_login: string): Promise<GetTopicResponse> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, ownerId: owner_id, ownerLogin: owner_login }),
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

  getTopicComments: async (
    topic_id: number,
    comment_start: number,
    size: number,
  ): Promise<CommentResponseWithCount> => {
    const response = await fetch(
      `${baseUrlAPI_dev}/comments?offset=${comment_start}&limit=${size}&topicId=${topic_id}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch topics');
    }
    return response.json();
  },

  createComment: async (comment: GetCommentResponse): Promise<GetCommentResponse> => {
    const response = await fetch(`${baseUrlAPI_dev}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: comment.text,
        ownerId: comment.ownerId,
        ownerLogin: comment.ownerLogin,
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
