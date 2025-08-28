export interface GetTopicListResponse {
  id: number;
  name: string;
  owner_id: number;
  owner_login: string;
  create_date: Date;
  comment_count: number;
  last: GetCommentResponse;
}
export interface GetCommentResponse {
  id: number;
  text: string;
  topic_id: number;
  owner_id: number;
  owner_login: string;
  reply_comment_id: number;
  create_date: Date;
  avatar: string;
}
export interface GetTopicResponse {
  id: number;
  name: string;
  owner_id: number;
  owner_login: string;
  create_date: Date;
  comment_count: number;
  last: GetCommentResponse;
  comments: GetCommentResponse[];
}

const getDefaultComment = (): GetCommentResponse => ({
  id: 0,
  text: '',
  topic_id: 0,
  owner_id: 0,
  owner_login: '',
  reply_comment_id: 0,
  create_date: new Date(),
  avatar: '',
});

export const getDefaultTopic = (): GetTopicResponse => ({
  id: 0,
  name: '',
  owner_id: 0,
  owner_login: '',
  create_date: new Date(),
  comment_count: 0,
  last: getDefaultComment(),
  comments: [],
});
