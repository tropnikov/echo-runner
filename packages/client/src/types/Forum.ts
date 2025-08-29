export interface GetTopicResponse {
  id?: number;
  ownerId: number;
  ownerLogin: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  commentsCount?: number;
  lastComment?: GetCommentResponse;
}
export interface GetCommentResponse {
  id?: number;
  ownerId: number;
  ownerLogin: string;
  replyCommentId?: number;
  text: string;
  topicId?: number;
  createdAt?: string;
  updatedAt?: string;
}
// export interface GetTopicResponse {
//   id?: number;
//   name: string;
//   owner_id: number;
//   owner_login: string;
//   create_date?: Date;
//   comment_count?: number;
//   last?: GetCommentResponse;
//   comments?: GetCommentResponse[];
// }

export const getDefaultComment = (): GetCommentResponse => ({
  id: 0,
  ownerId: 0,
  ownerLogin: '',
  replyCommentId: 0,
  text: '',
  topicId: 0,
  createdAt: '',
  updatedAt: '',
});

export const getDefaultTopic = (): GetTopicResponse => ({
  id: 0,
  ownerId: 0,
  ownerLogin: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  commentsCount: 0,
  lastComment: getDefaultComment(),
});

export interface Topic {
  key: string;
  topic: {
    id: number;
    title: string;
    author: string;
    created_at: Date;
  };
  count: number;
  last: {
    user: string;
    date?: Date;
  };
}

export interface Comment {
  id?: number;
  avatar?: string;
  author?: string;
  date?: string;
  comment: string;
}
