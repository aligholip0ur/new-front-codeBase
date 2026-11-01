// features/latest-requests/hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { latestRequestsKeys } from './query-keys';
import { latestRequestsService } from './queries';

export const useLatestRequests = () =>
  useQuery({
    queryKey: latestRequestsKeys.latestRequests,
    queryFn: latestRequestsService.fetchAll,
  });

export const useResetFeedback = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: latestRequestsService.resetFeedback,
    onSuccess: () => qc.invalidateQueries({ queryKey: latestRequestsKeys.latestRequests }),
    meta: { silent: true },
  });
};

export const useAnalyssisRequest = (params: {
  indicatorItemId: string;
  status: ('I' | 'F' | 'E' | 'P' | 'N')[] | null;
  page: number;
  pageSize: number;
  searchClause?: string | null;
  requestCode: string;
}) =>
  useQuery({
    queryKey: latestRequestsKeys.analaysisCount(params),
    queryFn: () => latestRequestsService.fetchRequestCount(params),
  });
