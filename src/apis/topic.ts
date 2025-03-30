import axiosInstance, { endpoints } from '@/utils/axios';

import { IApiResponse } from '@/interfaces/api-response';
import { ITopic } from '@/interfaces/topic';

//--------------------------------------------------------------------------------------------

export const getTopics = async (): Promise<IApiResponse<ITopic[]>> => {
  
  const response = await axiosInstance.get(
    endpoints.topic.get,
  );
  
  return response.data;
};

export const createTopic = async (
  topicData: Partial<ITopic>
): Promise<IApiResponse<ITopic>> => {
  const { data } = await axiosInstance.post(
    endpoints.topic.create,
    topicData
  );
  return data;
};

export const deleteTopic = async (
  topicId: string
): Promise<IApiResponse<ITopic>> => {
  const { data } = await axiosInstance.delete(
    endpoints.topic.delete(topicId)
  );
  return data;
}
