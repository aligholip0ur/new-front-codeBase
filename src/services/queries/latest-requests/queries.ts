// features/latest-requests/api/latest-requests.service.ts
import { apiClient } from '@/services/api-config';
import { URLS } from '@/services/urls';
import type { ResponseModel } from '@/models';

export const latestRequestsService = {
  fetchAll: async () => {
    const { data } = await apiClient.post<ResponseModel<{ name: string }[]>>(
      URLS.FETCH_USER_REQUESTS
    );
    return data;
  },
  fetchRequestCount: async (params: {
    indicatorItemId: string;
    status: ('I' | 'F' | 'E' | 'P' | 'N')[] | null;
    page: number;
    pageSize: number;
    searchClause?: string | null;
    requestCode: string;
  }) => {
    const { data } = await apiClient.post<ResponseModel<{ name: string }[]>>(
      URLS.FETCH_ANALAYSIS_REQUEST,
      params
    );
    return data;
  },
  resetFeedback: async (indicatorItemId: string) => {
    const { data } = await apiClient.post<ResponseModel<null>>(URLS.RESET_USER_FEEDBACK, {
      indicatorItemId,
    });
    return data;
  },
};
