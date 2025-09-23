import { api } from '../../redux/api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAuthSignup: build.mutation<PostAuthSignupApiResponse, PostAuthSignupApiArg>({
      query: (queryArg) => ({ url: `/auth/signup`, method: 'POST', body: queryArg.signUpRequest }),
    }),
    postAuthSignin: build.mutation<PostAuthSigninApiResponse, PostAuthSigninApiArg>({
      query: (queryArg) => ({ url: `/auth/signin`, method: 'POST', body: queryArg.signInRequest }),
    }),
    getAuthUser: build.query<GetAuthUserApiResponse, GetAuthUserApiArg>({
      query: () => ({ url: `/auth/user` }),
    }),
    postAuthLogout: build.mutation<PostAuthLogoutApiResponse, PostAuthLogoutApiArg>({
      query: () => ({ url: `/auth/logout`, method: 'POST' }),
    }),
    getChats: build.query<GetChatsApiResponse, GetChatsApiArg>({
      query: (queryArg) => ({
        url: `/chats`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          title: queryArg.title,
        },
      }),
    }),
    postChats: build.mutation<PostChatsApiResponse, PostChatsApiArg>({
      query: (queryArg) => ({ url: `/chats`, method: 'POST', body: queryArg.createChatRequest }),
    }),
    deleteChats: build.mutation<DeleteChatsApiResponse, DeleteChatsApiArg>({
      query: (queryArg) => ({ url: `/chats`, method: 'DELETE', body: queryArg.chatDeleteRequest }),
    }),
    getChatsByIdFiles: build.query<GetChatsByIdFilesApiResponse, GetChatsByIdFilesApiArg>({
      query: (queryArg) => ({ url: `/chats/${queryArg.id}/files` }),
    }),
    getChatsArchive: build.query<GetChatsArchiveApiResponse, GetChatsArchiveApiArg>({
      query: (queryArg) => ({
        url: `/chats/archive`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          title: queryArg.title,
        },
      }),
    }),
    postChatsArchive: build.mutation<PostChatsArchiveApiResponse, PostChatsArchiveApiArg>({
      query: (queryArg) => ({ url: `/chats/archive`, method: 'POST', body: queryArg.chatArchiveRequest }),
    }),
    postChatsUnarchive: build.mutation<PostChatsUnarchiveApiResponse, PostChatsUnarchiveApiArg>({
      query: (queryArg) => ({ url: `/chats/unarchive`, method: 'POST', body: queryArg.chatArchiveRequest }),
    }),
    getChatsByIdCommon: build.query<GetChatsByIdCommonApiResponse, GetChatsByIdCommonApiArg>({
      query: (queryArg) => ({ url: `/chats/${queryArg.id}/common` }),
    }),
    getChatsByIdUsers: build.query<GetChatsByIdUsersApiResponse, GetChatsByIdUsersApiArg>({
      query: (queryArg) => ({
        url: `/chats/${queryArg.id}/users`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          name: queryArg.name,
          email: queryArg.email,
        },
      }),
    }),
    getChatsNewById: build.query<GetChatsNewByIdApiResponse, GetChatsNewByIdApiArg>({
      query: (queryArg) => ({ url: `/chats/new/${queryArg.id}` }),
    }),
    putChatsAvatar: build.mutation<PutChatsAvatarApiResponse, PutChatsAvatarApiArg>({
      query: (queryArg) => ({ url: `/chats/avatar`, method: 'PUT', body: queryArg.body }),
    }),
    putChatsUsers: build.mutation<PutChatsUsersApiResponse, PutChatsUsersApiArg>({
      query: (queryArg) => ({ url: `/chats/users`, method: 'PUT', body: queryArg.usersRequest }),
    }),
    deleteChatsUsers: build.mutation<DeleteChatsUsersApiResponse, DeleteChatsUsersApiArg>({
      query: (queryArg) => ({ url: `/chats/users`, method: 'DELETE', body: queryArg.usersRequest }),
    }),
    postChatsTokenById: build.mutation<PostChatsTokenByIdApiResponse, PostChatsTokenByIdApiArg>({
      query: (queryArg) => ({ url: `/chats/token/${queryArg.id}`, method: 'POST' }),
    }),
    postLeaderboard: build.mutation<PostLeaderboardApiResponse, PostLeaderboardApiArg>({
      query: (queryArg) => ({ url: `/leaderboard`, method: 'POST', body: queryArg.leaderboardNewLeaderRequest }),
    }),
    postLeaderboardAll: build.mutation<PostLeaderboardAllApiResponse, PostLeaderboardAllApiArg>({
      query: (queryArg) => ({ url: `/leaderboard/all`, method: 'POST', body: queryArg.leaderboardRequest }),
    }),
    postLeaderboardByTeamName: build.mutation<PostLeaderboardByTeamNameApiResponse, PostLeaderboardByTeamNameApiArg>({
      query: (queryArg) => ({
        url: `/leaderboard/${queryArg.teamName}`,
        method: 'POST',
        body: queryArg.leaderboardRequest,
      }),
    }),
    postOauthYandex: build.mutation<PostOauthYandexApiResponse, PostOauthYandexApiArg>({
      query: (queryArg) => ({ url: `/oauth/yandex`, method: 'POST', body: queryArg.oauthSignInRequest }),
    }),
    getOauthYandexServiceId: build.query<GetOauthYandexServiceIdApiResponse, GetOauthYandexServiceIdApiArg>({
      query: (queryArg) => ({
        url: `/oauth/yandex/service-id`,
        params: {
          redirect_uri: queryArg.redirectUri,
        },
      }),
    }),
    putUserProfile: build.mutation<PutUserProfileApiResponse, PutUserProfileApiArg>({
      query: (queryArg) => ({ url: `/user/profile`, method: 'PUT', body: queryArg.userUpdateRequest }),
    }),
    putUserProfileAvatar: build.mutation<PutUserProfileAvatarApiResponse, PutUserProfileAvatarApiArg>({
      query: (queryArg) => ({ url: `/user/profile/avatar`, method: 'PUT', body: queryArg.body }),
    }),
    putUserPassword: build.mutation<PutUserPasswordApiResponse, PutUserPasswordApiArg>({
      query: (queryArg) => ({ url: `/user/password`, method: 'PUT', body: queryArg.changePasswordRequest }),
    }),
    postUserSearch: build.mutation<PostUserSearchApiResponse, PostUserSearchApiArg>({
      query: (queryArg) => ({ url: `/user/search`, method: 'POST', body: queryArg.findUserRequest }),
    }),
    postChartsStatic: build.mutation<PostChartsStaticApiResponse, PostChartsStaticApiArg>({
      query: (queryArg) => ({ url: `/charts/static`, method: 'POST', body: queryArg.staticChartRequest }),
    }),
    postChartsLive: build.mutation<PostChartsLiveApiResponse, PostChartsLiveApiArg>({
      query: (queryArg) => ({ url: `/charts/live`, method: 'POST', body: queryArg.liveChartRequest }),
    }),
    getVideosStatic: build.query<GetVideosStaticApiResponse, GetVideosStaticApiArg>({
      query: (queryArg) => ({
        url: `/videos/static`,
        headers: {
          Range: queryArg.range,
        },
      }),
    }),
    getVideosStaticInfo: build.query<GetVideosStaticInfoApiResponse, GetVideosStaticInfoApiArg>({
      query: () => ({ url: `/videos/static/info` }),
    }),
    getVideosLive: build.query<GetVideosLiveApiResponse, GetVideosLiveApiArg>({
      query: (queryArg) => ({
        url: `/videos/live`,
        headers: {
          Range: queryArg.range,
        },
      }),
    }),
    postVideosLiveInfo: build.mutation<PostVideosLiveInfoApiResponse, PostVideosLiveInfoApiArg>({
      query: (queryArg) => ({ url: `/videos/live/info`, method: 'POST', body: queryArg.liveVideoInfoRequest }),
    }),
    postResources: build.mutation<PostResourcesApiResponse, PostResourcesApiArg>({
      query: (queryArg) => ({ url: `/resources`, method: 'POST', body: queryArg.body }),
    }),
    getResourcesByPath: build.query<GetResourcesByPathApiResponse, GetResourcesByPathApiArg>({
      query: (queryArg) => ({ url: `/resources/${queryArg.path}` }),
    }),
    getStickers: build.query<GetStickersApiResponse, GetStickersApiArg>({
      query: (queryArg) => ({
        url: `/stickers`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          title: queryArg.title,
        },
      }),
    }),
    postStickers: build.mutation<PostStickersApiResponse, PostStickersApiArg>({
      query: (queryArg) => ({ url: `/stickers`, method: 'POST', body: queryArg.body }),
    }),
    getStickersById: build.query<GetStickersByIdApiResponse, GetStickersByIdApiArg>({
      query: (queryArg) => ({
        url: `/stickers/${queryArg.id}/`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
        },
      }),
    }),
    postStickersById: build.mutation<PostStickersByIdApiResponse, PostStickersByIdApiArg>({
      query: (queryArg) => ({ url: `/stickers/${queryArg.id}/`, method: 'POST', body: queryArg.body }),
    }),
    getStickersFavorite: build.query<GetStickersFavoriteApiResponse, GetStickersFavoriteApiArg>({
      query: (queryArg) => ({
        url: `/stickers/favorite`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          title: queryArg.title,
        },
      }),
    }),
    postStickersByIdFavorite: build.mutation<PostStickersByIdFavoriteApiResponse, PostStickersByIdFavoriteApiArg>({
      query: (queryArg) => ({ url: `/stickers/${queryArg.id}/favorite`, method: 'POST' }),
    }),
    deleteStickersByIdFavorite: build.mutation<DeleteStickersByIdFavoriteApiResponse, DeleteStickersByIdFavoriteApiArg>(
      {
        query: (queryArg) => ({ url: `/stickers/${queryArg.id}/favorite`, method: 'DELETE' }),
      },
    ),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type PostAuthSignupApiResponse = /** status 200 Ok */ SignUpResponse;
export type PostAuthSignupApiArg = {
  /** User data */
  signUpRequest: SignUpRequest;
};
export type PostAuthSigninApiResponse = /** status 200 Ok */ string;
export type PostAuthSigninApiArg = {
  /** User data */
  signInRequest: SignInRequest;
};
export type GetAuthUserApiResponse = /** status 200 An array of user info */ UserResponse;
export type GetAuthUserApiArg = void;
export type PostAuthLogoutApiResponse = unknown;
export type PostAuthLogoutApiArg = void;
export type GetChatsApiResponse = /** status 200 Ok */ ChatsResponse[];
export type GetChatsApiArg = {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Chat's title to filter by */
  title?: string;
};
export type PostChatsApiResponse = /** status 200 Ok */ CreateChatResponse;
export type PostChatsApiArg = {
  /** Chat data */
  createChatRequest: CreateChatRequest;
};
export type DeleteChatsApiResponse = /** status 200 Ok */ ChatDeleteResponse;
export type DeleteChatsApiArg = {
  chatDeleteRequest: ChatDeleteRequest;
};
export type GetChatsByIdFilesApiResponse = /** status 200 Ok */ ChatMessage[];
export type GetChatsByIdFilesApiArg = {
  /** Numeric chat id */
  id: any;
};
export type GetChatsArchiveApiResponse = /** status 200 Ok */ ChatsResponse[];
export type GetChatsArchiveApiArg = {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Chat's title to filter by */
  title?: string;
};
export type PostChatsArchiveApiResponse = /** status 200 Ok */ ChatArchiveResponse;
export type PostChatsArchiveApiArg = {
  chatArchiveRequest: ChatArchiveRequest;
};
export type PostChatsUnarchiveApiResponse = /** status 200 Ok */ ChatArchiveResponse;
export type PostChatsUnarchiveApiArg = {
  chatArchiveRequest: ChatArchiveRequest;
};
export type GetChatsByIdCommonApiResponse = /** status 200 Ok */ ChatsResponse[];
export type GetChatsByIdCommonApiArg = {
  /** Numeric chat id */
  id: any;
};
export type GetChatsByIdUsersApiResponse = /** status 200 Ok */ ChatUserResponse[];
export type GetChatsByIdUsersApiArg = {
  /** Numeric chat id */
  id: any;
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** User's '{first_name} {second_name}' to filter */
  name?: string;
  /** User's email to filter */
  email?: string;
};
export type GetChatsNewByIdApiResponse = /** status 200 Ok */ UnreadCountResponse;
export type GetChatsNewByIdApiArg = {
  /** Numeric chat id */
  id: any;
};
export type PutChatsAvatarApiResponse = /** status 200 Ok */ ChatsResponse;
export type PutChatsAvatarApiArg = {
  body: {
    /** Chat id */
    chatId: number;
    /** Avatar (JPEG, JPG, PNG, GIF, WebP are allowed) */
    avatar: Blob;
  };
};
export type PutChatsUsersApiResponse = /** status 200 Ok */ string;
export type PutChatsUsersApiArg = {
  usersRequest: UsersRequest;
};
export type DeleteChatsUsersApiResponse = /** status 200 Ok */ string;
export type DeleteChatsUsersApiArg = {
  usersRequest: UsersRequest;
};
export type PostChatsTokenByIdApiResponse = /** status 200 Ok */ ChatsMessagesTokenResponse[];
export type PostChatsTokenByIdApiArg = {
  /** Numeric chat id */
  id: any;
};
export type PostLeaderboardApiResponse = /** status 200 Ok */ string;
export type PostLeaderboardApiArg = {
  /** Leader data */
  leaderboardNewLeaderRequest: LeaderboardNewLeaderRequest;
};
export type PostLeaderboardAllApiResponse = unknown;
export type PostLeaderboardAllApiArg = {
  /** Leaderboard request */
  leaderboardRequest: LeaderboardRequest;
};
export type PostLeaderboardByTeamNameApiResponse = unknown;
export type PostLeaderboardByTeamNameApiArg = {
  /** Name of the team, which leaderboard you want to get */
  teamName: any;
  /** Leaderboard request. Cursor is used for pagination. If limit is 10, then for the 1st page - cursor=0, for the 2nd page - cursor=10. */
  leaderboardRequest: LeaderboardRequest;
};
export type PostOauthYandexApiResponse = /** status 200 Ok */ string;
export type PostOauthYandexApiArg = {
  /** Oauth data */
  oauthSignInRequest: OauthSignInRequest;
};
export type GetOauthYandexServiceIdApiResponse = /** status 200 Yandex client id */ ServiceId;
export type GetOauthYandexServiceIdApiArg = {
  /** Redirect uri that you are using for oauth */
  redirectUri?: string;
};
export type PutUserProfileApiResponse = /** status 200 Ok */ UserResponse;
export type PutUserProfileApiArg = {
  /** User data */
  userUpdateRequest: UserUpdateRequest;
};
export type PutUserProfileAvatarApiResponse = /** status 200 Ok */ UserResponse;
export type PutUserProfileAvatarApiArg = {
  body: {
    /** Avatar (JPEG, JPG, PNG, GIF, WebP are allowed) */
    avatar: Blob;
  };
};
export type PutUserPasswordApiResponse = /** status 200 Ok */ string;
export type PutUserPasswordApiArg = {
  /** Password request */
  changePasswordRequest: ChangePasswordRequest;
};
export type PostUserSearchApiResponse = /** status 200 Ok */ UserResponse[];
export type PostUserSearchApiArg = {
  /** User data */
  findUserRequest: FindUserRequest;
};
export type PostChartsStaticApiResponse = /** status 200 Ok */ StaticChartResponse;
export type PostChartsStaticApiArg = {
  /** chart size */
  staticChartRequest: StaticChartRequest;
};
export type PostChartsLiveApiResponse = /** status 200 Ok */ LiveChartResponse;
export type PostChartsLiveApiArg = {
  /** next (cursor) */
  liveChartRequest: LiveChartRequest;
};
export type GetVideosStaticApiResponse = unknown;
export type GetVideosStaticApiArg = {
  range: any;
};
export type GetVideosStaticInfoApiResponse = unknown;
export type GetVideosStaticInfoApiArg = void;
export type GetVideosLiveApiResponse = unknown;
export type GetVideosLiveApiArg = {
  range: any;
};
export type PostVideosLiveInfoApiResponse = unknown;
export type PostVideosLiveInfoApiArg = {
  /** iteration (cursor) */
  liveVideoInfoRequest: LiveVideoInfoRequest;
};
export type PostResourcesApiResponse = unknown;
export type PostResourcesApiArg = {
  body: {
    resource: Blob;
  };
};
export type GetResourcesByPathApiResponse = unknown;
export type GetResourcesByPathApiArg = {
  /** Path to the file */
  path: any;
};
export type GetStickersApiResponse = /** status 200 Ok */ StickerPacksResponse[];
export type GetStickersApiArg = {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Sticker's title to filter by */
  title?: string;
};
export type PostStickersApiResponse = /** status 201 Created */ string;
export type PostStickersApiArg = {
  body: {
    /** Sticker pack title */
    title: string;
    /** Sticker image (can be multiple images, just attach multiple files). JPEG, JPG, PNG, GIF, WebP are allowed */
    resource: Blob;
  };
};
export type GetStickersByIdApiResponse = /** status 200 Ok */ StickersResponse[];
export type GetStickersByIdApiArg = {
  /** Numeric sticker pack id */
  id: any;
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
};
export type PostStickersByIdApiResponse = /** status 200 Ok */ string;
export type PostStickersByIdApiArg = {
  /** Numeric sticker pack id */
  id: any;
  body: {
    /** Sticker image (can be multiple images, just attach multiple files). JPEG, JPG, PNG, GIF, WebP are allowed */
    resource: Blob;
  };
};
export type GetStickersFavoriteApiResponse = /** status 200 Ok */ StickerPacksResponse;
export type GetStickersFavoriteApiArg = {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Sticker pack title to filter by */
  title?: string;
};
export type PostStickersByIdFavoriteApiResponse = unknown;
export type PostStickersByIdFavoriteApiArg = {
  /** Numeric sticker pack id */
  id: any;
};
export type DeleteStickersByIdFavoriteApiResponse = unknown;
export type DeleteStickersByIdFavoriteApiArg = {
  /** Numeric sticker pack id */
  id: any;
};
export type SignUpResponse = {
  /** Created User ID */
  id: number;
};
export type HttpErrorBody = {
  /** Error message */
  reason: string;
};
export type SignUpRequest = {
  /** First name */
  first_name: string;
  /** Second name */
  second_name: string;
  /** User login - unique */
  login: string;
  /** Email /^\S+@\S+$/ */
  email: string;
  /** Password */
  password: string;
  /** Phone /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ */
  phone: string;
};
export type SignInRequest = {
  /** User login */
  login: string;
  /** Password */
  password: string;
};
export type UserResponse = {
  /** User id */
  id: number;
  /** First name */
  first_name: string;
  /** Second name */
  second_name: string;
  /** Display name */
  display_name: string;
  /** User login - unique */
  login: string;
  /** User email - unique */
  email: string;
  /** User phone */
  phone: string;
  /** Avatar */
  avatar: string;
};
export type ChatsResponse = {
  /** Chat id */
  id: number;
  /** Chat title */
  title: string;
  /** Chat avatar */
  avatar: string;
  /** Number of unread messages in chat for current user */
  unread_count: number;
  last_message: {
    user?: UserResponse;
    /** Message timestamp */
    time?: string;
    /** Message content */
    content?: string;
  };
};
export type CreateChatResponse = {
  /** Created Chat ID */
  id: number;
};
export type CreateChatRequest = {
  /** Chat title */
  title: string;
};
export type ChatDeleteResponse = {
  /** User id */
  userId: number;
  result: ChatsResponse;
};
export type ChatDeleteRequest = {
  /** Chat id */
  chatId: number;
};
export type Resource = {
  /** Message id */
  id: number;
  /** User id */
  user_id: number;
  /** Server relative file path */
  path: string;
  /** Initial file name */
  filename: string;
  /** File content type (e.g "image/jpeg" for .jpg images) */
  content_type: string;
  /** File size in bytes */
  content_size: number;
  /** Resource uploading time */
  upload_date: string;
};
export type ChatMessage = {
  /** Message id */
  id: number;
  /** User id */
  user_id: number;
  /** Chat id */
  chat_id: number;
  /** Message sent time */
  time: string;
  /** Message type */
  type: 'message' | 'file';
  /** Message content (message text for messages and resourceId for files) */
  content: string;
  file?: Resource;
};
export type ChatArchiveResponse = {
  /** User id */
  userId: number;
  result: ChatsResponse;
};
export type ChatArchiveRequest = {
  /** Chat id */
  chatId: number;
};
export type ChatUserResponse = {
  /** User id */
  id: number;
  /** First name */
  first_name: string;
  /** Second name */
  second_name: string;
  /** Display name */
  display_name: string;
  /** User login - unique */
  login: string;
  /** Avatar */
  avatar: string;
  /** User role */
  role: 'admin' | 'regular';
};
export type UnreadCountResponse = {
  /** New messages count */
  unread_count: number;
};
export type UsersRequest = {
  users: number[];
  /** Chat id */
  chatId: number;
};
export type ChatsMessagesTokenResponse = {
  /** Token for web socket server */
  token: string;
};
export type LeaderboardNewLeaderRequest = {
  /** Leaderboard data object, any type */
  data: {};
  /** Which field is used to sort (if new value of the field more than old, data is stored) */
  ratingFieldName: string;
  /** Your team name. Used to make unique leaderboard for each project. */
  teamName?: string;
};
export type LeaderboardRequest = {
  /** Which field is used to sort */
  ratingFieldName: string;
  /** Used to paginate between pages. If limit is 10, then for the 1st page - cursor=0, for the 2nd page - cursor=10. */
  cursor: number;
  /** Maximum amount of leaders to return */
  limit: number;
};
export type OauthSignInRequest = {
  /** User code from Yandex */
  code: string;
  /** Redirect uri that you are using for oauth */
  redirect_uri: string;
};
export type ServiceId = {
  /** Service id */
  service_id: string;
};
export type UserUpdateRequest = {
  /** First name */
  first_name?: string;
  /** Second name */
  second_name?: string;
  /** Display Name */
  display_name?: string;
  /** User login - unique */
  login?: string;
  /** Email */
  email?: string;
  /** Phone */
  phone?: string;
};
export type ChangePasswordRequest = {
  /** Old password */
  oldPassword: string;
  /** New password */
  newPassword: string;
};
export type FindUserRequest = {
  /** User login (beginning of login) */
  login: string;
};
export type ChartSchema = {
  /** X axis (datetime) */
  x?: string;
  y1?: number;
  y2?: number;
}[];
export type StaticChartResponse = {
  data?: ChartSchema;
};
export type StaticChartRequest = {
  /** Number of points in chart (10 / 100 / 1000) */
  chartSize: 'small' | 'medium' | 'large';
};
export type LiveChartResponse = {
  /** Used as a cursor (pass this value to the next request) */
  next?: number;
  data?: ChartSchema;
};
export type LiveChartRequest = {
  /** Works as a cursor (initial value should be zero, all the next values are taken from the backend response) */
  next: number;
};
export type LiveVideoInfoRequest = {
  /** Works as a cursor (iterate + 1 each request) */
  iteration: number;
};
export type StickerPack = {
  /** Sticker pack title */
  title?: string;
  /** User id that created this pack */
  user_id?: number;
  stickers?: string[];
};
export type StickerPacksResponse = {
  /** StickerPacks */
  data?: StickerPack[];
};
export type Sticker = {
  /** Sticker id (send to chat with WS) */
  id?: number;
  /** Url for sticker resource(image) */
  path?: string;
};
export type StickersResponse = {
  /** Stickers */
  data?: Sticker[];
};
export const {
  usePostAuthSignupMutation,
  usePostAuthSigninMutation,
  useGetAuthUserQuery,
  useLazyGetAuthUserQuery,
  usePostAuthLogoutMutation,
  useGetChatsQuery,
  useLazyGetChatsQuery,
  usePostChatsMutation,
  useDeleteChatsMutation,
  useGetChatsByIdFilesQuery,
  useLazyGetChatsByIdFilesQuery,
  useGetChatsArchiveQuery,
  useLazyGetChatsArchiveQuery,
  usePostChatsArchiveMutation,
  usePostChatsUnarchiveMutation,
  useGetChatsByIdCommonQuery,
  useLazyGetChatsByIdCommonQuery,
  useGetChatsByIdUsersQuery,
  useLazyGetChatsByIdUsersQuery,
  useGetChatsNewByIdQuery,
  useLazyGetChatsNewByIdQuery,
  usePutChatsAvatarMutation,
  usePutChatsUsersMutation,
  useDeleteChatsUsersMutation,
  usePostChatsTokenByIdMutation,
  usePostLeaderboardMutation,
  usePostLeaderboardAllMutation,
  usePostLeaderboardByTeamNameMutation,
  usePostOauthYandexMutation,
  useGetOauthYandexServiceIdQuery,
  useLazyGetOauthYandexServiceIdQuery,
  usePutUserProfileMutation,
  usePutUserProfileAvatarMutation,
  usePutUserPasswordMutation,
  usePostUserSearchMutation,
  usePostChartsStaticMutation,
  usePostChartsLiveMutation,
  useGetVideosStaticQuery,
  useLazyGetVideosStaticQuery,
  useGetVideosStaticInfoQuery,
  useLazyGetVideosStaticInfoQuery,
  useGetVideosLiveQuery,
  useLazyGetVideosLiveQuery,
  usePostVideosLiveInfoMutation,
  usePostResourcesMutation,
  useGetResourcesByPathQuery,
  useLazyGetResourcesByPathQuery,
  useGetStickersQuery,
  useLazyGetStickersQuery,
  usePostStickersMutation,
  useGetStickersByIdQuery,
  useLazyGetStickersByIdQuery,
  usePostStickersByIdMutation,
  useGetStickersFavoriteQuery,
  useLazyGetStickersFavoriteQuery,
  usePostStickersByIdFavoriteMutation,
  useDeleteStickersByIdFavoriteMutation,
} = injectedRtkApi;
