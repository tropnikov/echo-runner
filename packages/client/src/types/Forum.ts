export interface GetTopicListResponse {
  id: number;
  name: string;
  owner_id: number;
  create_date: Date;
  comment_count: number;
  last: GetCommentResponse;
}

interface GetCommentResponse {
  id: number;
  text: string;
  topic_id: number;
  owner_id: number;
  reply_comment_id: number;
  create_date: Date;
}
