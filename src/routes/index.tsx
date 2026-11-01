import type { RouteObject } from 'react-router';

import { paths } from './paths';
import { createBrowserRouter } from 'react-router';
import Home from '../pages/home';

export const routes: RouteObject[] = [
  {
    path: paths.home,
    element: <Home />,
  },
];
export const router = createBrowserRouter(routes);
