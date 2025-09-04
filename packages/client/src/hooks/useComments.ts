import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { GetCommentResponse } from '@/types/Forum';

export const useComments = (id: number, comment_start: number, size: number) => {
  const [comments, setComments] = useState<GetCommentResponse[]>([]);
  const [count, setCount] = useState(0);

  const loadComments = async () => {
    try {
      const { comments, count } = await topicApi.getTopicComments(id, comment_start * size, size);
      setComments(comments);
      setCount(count);
    } catch (error) {
      console.error(`Error loading topic:${id}`, error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [id, comment_start, size]);

  return { comments, loadComments, count };
};
