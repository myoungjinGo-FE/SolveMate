import { apiClient } from "@/lib/api-client";
import { Problem } from "@/lib/types/problems";

export const ProblemsAPI = {
  search: async (query: string): Promise<Problem[]> => {
    const response = await apiClient.get<Problem[]>("/api/problems/search", {
      params: { query },
    });
    return response.data;
  },
};
