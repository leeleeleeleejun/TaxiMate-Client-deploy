const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_PATH = {
  SEARCH: {
    GET: 'https://dapi.kakao.com/v2/local/search/keyword.json',
  },
  POST: {
    GET: {
      ALL: API_BASE_URL + `/api/v1/parties`,
      // 포스트 ID 조회
      BY_ID: API_BASE_URL + `/api/v1/parties/:partyId`,
      // 특정 유저의 전체 포스트 조회
      BY_USER: API_BASE_URL + `/posts/user/:userId`,
      JOIN_POSTS: API_BASE_URL + `/api/v1/participation`,
      CLOSE_POSTS: API_BASE_URL + `/api/v1/participation?isTerminated=true`,
    },
    POST: API_BASE_URL + `/api/v1/parties`,
  },
  USER: {
    GET_ACCESS_TOKEN: API_BASE_URL + `/oauth2/kakao`,
    GET_REFRESH_ACCESS_TOKEN: API_BASE_URL + `/api/v1/auth/tokens`,
    GET_PROFILES: API_BASE_URL + `/api/v1/profiles`,
    SET_PUSH_ALARM: API_BASE_URL + `/api/v1/notifications/tokens`,
  },
  CHAT: {
    PARTICIPATION: API_BASE_URL + `/api/v1/participation`,
    GET_CHAT_LIST: API_BASE_URL + `/api/v1/chats`,
    GET_CHAT: API_BASE_URL + '/api/v1/chats/:partyId',
  },
};

export const CLIENT_PATH = {
  SEARCH: '/search',
  POST_DETAIL: '/posts/:postId',
  CREATE_POST: '/create-post',
  UPDATE_POST: '/update-post/:postId',
  CHAT_LISTS: '/chat-list',
  CHAT_ROOM: '/chat-list/:chatRoomId',
  USAGE_HISTORY: '/usage-history',
  MY_PROFILE: '/my-profile',
  LOGIN: '/login',
  LOGIN_LOADING: '/login-loading',
};
