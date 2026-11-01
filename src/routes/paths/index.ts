export const paths = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  users: {
    list: '/dashboard/users',
    detail: (id: string) => `/dashboard/users/${id}`,
    pattern: ':userId',
  },
  settings: '/dashboard/settings',
  forbidden: '/403',
} as const;
