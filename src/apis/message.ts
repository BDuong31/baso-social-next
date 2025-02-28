import axiosInstance from '@/utils/axios';
import { endpoints } from '@/utils/axios';

import { IChatRoom } from '@/interfaces/message';
import { IApiResponse } from '@/interfaces/api-response';
import { CreatePost, UpdatePost } from '@/schema/posts-schema';

//--------------------------------------------------------------------------------------------

export const getChatRooms = async (params?: {
  str?: string;
  limit?: number;
  userId?: string;
  type?: string;
}): Promise<IChatRoom[]> => {
  const response = await axiosInstance.get<IChatRoom[]>(
    endpoints.chat.getConversations,
    {
      params,
    }
  );
  return response.data;
};

export const createChatRoom = async (data: {
  creatorId: string;
  receiverId: string;
}): Promise<IApiResponse<IChatRoom>> => {
  const response = await axiosInstance.post<IApiResponse<IChatRoom>>(
    endpoints.chat.createConversation,
    data
  );
  return response.data;
}