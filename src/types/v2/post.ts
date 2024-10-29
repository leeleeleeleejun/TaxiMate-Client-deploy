export interface Post {
  id: string;
  title: string;
  departureTime: string;
  origin: string;
  maxParticipants: number;
  currentParticipants: number;
  destination: string;
  originLocation: { latitude: number; longitude: number };
}

export type PostDetailStatus =
  | 'NONE'
  | 'PARTICIPATING'
  | 'TERMINATED'
  | 'WARNED'
  | 'BANNED';

interface Participants {
  id: string;
  nickname: string;
  profileImage: string;
  role: 'HOST' | 'PARTICIPANT';
}

export interface PostDetail extends Post {
  explanation: string;
  originAddress: string;
  destinationAddress: string;
  destinationLocation: { latitude: number; longitude: number };
  status: PostDetailStatus;
  createdAt: string;
  views: string;
  participants: Participants[];
  taxi: {
    route: { latitude: number; longitude: number }[];
    fare: string;
    duration: string;
  };
}

export interface CreatePostRes {
  success: boolean;
  message: string;
  data: {
    partyId: string;
  };
}
