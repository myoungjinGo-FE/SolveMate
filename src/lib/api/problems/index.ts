import { apiClient } from "@/lib/api-client";
import { Problem } from "@/lib/types/problems";

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Problem[];
}

export const ProblemsAPI = {
  get: async (title: string): Promise<Problem[]> => {
    const response = await apiClient.get<PaginatedResponse>("/api/problems", {
      params: { title: title },
    });
    return response.data.results;
  },
  create: async (data: Problem): Promise<Problem> => {
    const response = await apiClient.post<Problem>("/api/problems", data);
    return response.data;
  },
};
