export interface Post {
  id: string;
  title: string;
  maxParticipants: number;
  currentParticipants: number;
  status: PostDetailStatus;
  createdAt: string;
  host: {
    id: string;
    nickname: string;
    profileImage: string;
    isMe: boolean;
  };
}

export type PostDetailStatus = 'NONE' | 'PARTICIPATING';

export interface RegisterData {
  title: string;
  maxParticipants: string;
}

export interface CreatePostRes {
  success: boolean;
  message: string;
  data: {
    partyId: string;
  };
}
