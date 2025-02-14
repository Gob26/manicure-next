import { axiosInstance } from "@/api/axiosInstance";
import { IMastersListResponse } from "@/types/masters/Master.interface";

export const getMastersByCity = async (citySlug: string): Promise<IMastersListResponse> =>  {
  const response = await axiosInstance.get(`${citySlug}/masters`);
  return response.data;
};
