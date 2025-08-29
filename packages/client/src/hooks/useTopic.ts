import { useEffect, useState } from 'react';

import { topicApi } from '@/api/apiForum';
import { GetCommentResponse, getDefaultTopic, GetTopicResponse } from '@/types/Forum';

export const useTopic = (id: number /*comment_start: number, size: number*/) => {
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
  }, [id]);

  return { topic };
};

export const useCommentList = (/*id: number , comment_start: number, size: number*/) => {
  const [comments /*, setComments*/] = useState<GetCommentResponse[]>([]);

  /*  const loadComments = async (id: number) => {
    try {
      const data = await topicApi.getTopicComments(id, comment_start, size);
      setComments(data);
    } catch (error) {
      console.error(`Error loading topic:${id}`, error);
    }
  };

  useEffect(() => {
    loadComments(id);
  }, [id, comment_start, size]);
*/
  return { comments /*, loadComments*/ };
};
