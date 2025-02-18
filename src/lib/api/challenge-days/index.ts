import { apiClient } from "@/lib/api-client";
import { ChallengeDay } from "@/lib/types/challenge-days";

export const ChallengeDaysAPI = {
  getAll: async (): Promise<ChallengeDay[]> => {
    const response = await apiClient.get<ChallengeDay[]>("/api/challenge-days");
    return response.data;
  },

  getOne: async (id: number): Promise<ChallengeDay> => {
    const response = await apiClient.get<ChallengeDay>(
      `/api/challenge-days/${id}`
    );
    return response.data;
  },

  create: async (data: ChallengeDay): Promise<ChallengeDay> => {
    const response = await apiClient.post<ChallengeDay>(
      "/api/challenge-days",
      data
    );
    return response.data;
  },

  update: async (id: number, data: ChallengeDay): Promise<ChallengeDay> => {
    const response = await apiClient.put<ChallengeDay>(
      `/api/challenge-days/${id}`,
      data
    );
    return response.data;
  },

  partialUpdate: async (
    id: number,
    data: Partial<ChallengeDay>
  ): Promise<ChallengeDay> => {
    const response = await apiClient.patch<ChallengeDay>(
      `/api/challenge-days/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/challenge-days/${id}`);
  },
};
