export const latestRequestsKeys = {
  latestRequests: ['latestRequests'] as const,
  analaysisCount: (params: {
    indicatorItemId: string;
    status: ('I' | 'F' | 'E' | 'P' | 'N')[] | null;
    page: number;
    pageSize: number;
    searchClause?: string | null;
    requestCode: string;
  }) => [...latestRequestsKeys.latestRequests, 'analaysisCount', params] as const,
};
