import { baseUrlAPI_dev } from '@/constants/apiEndpoint';
import { handleResponse } from '@/helpers/apiErrorHandler';
import { CommentResponseWithCount, GetCommentResponse, GetTopicResponse } from '@/types/Forum';

export const topicApi = {
  getAllTopics: async (
    pageNumber: number,
    pageSize: number,
  ): Promise<{ topics: GetTopicResponse[]; count: number }> => {
    const params = new URLSearchParams({ offset: pageNumber.toString(), limit: pageSize.toString() });
    const response = await fetch(`${baseUrlAPI_dev}/topics?${params}`, { credentials: 'include' });

    return await handleResponse<{ topics: GetTopicResponse[]; count: number }>(response, 'Failed to fetch topics');
  },

  getTopicById: async (id: number): Promise<GetTopicResponse> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics/${id}`, { credentials: 'include' });
    return await handleResponse<GetTopicResponse>(response, 'Failed to fetch topic');
  },

  createTopic: async (name: string): Promise<GetTopicResponse> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
      credentials: 'include',
    });

    return await handleResponse<GetTopicResponse>(response, 'Failed to create topic');
  },

  deleteTopic: async (id: number): Promise<void> => {
    const response = await fetch(`${baseUrlAPI_dev}/topics/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    return await handleResponse(response, 'Failed to delete topic');
  },

  getTopicComments: async (
    topic_id: number,
    comment_start: number,
    size: number,
  ): Promise<CommentResponseWithCount> => {
    const params = new URLSearchParams({
      offset: comment_start.toString(),
      limit: size.toString(),
      topicId: topic_id.toString(),
    });
    const response = await fetch(`${baseUrlAPI_dev}/comments?${params}`, { credentials: 'include' });

    return await handleResponse<CommentResponseWithCount>(response, 'Failed to fetch comments');
  },

  createComment: async (comment: GetCommentResponse): Promise<GetCommentResponse> => {
    const response = await fetch(`${baseUrlAPI_dev}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: comment.text,
        topicId: comment.topicId,
        replyCommentId: comment.replyCommentId,
      }),
      credentials: 'include',
    });

    return await handleResponse<GetCommentResponse>(response, 'Failed to create comment');
  },
};
