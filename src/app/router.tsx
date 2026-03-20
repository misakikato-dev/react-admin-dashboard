/**
 * @file このファイルはアプリケーション全体のルーティング定義をまとめます。
 */

import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { UserCreatePage } from '@/features/users/pages/UserCreatePage';
import { UserDetailPage } from '@/features/users/pages/UserDetailPage';
import { UserEditPage } from '@/features/users/pages/UserEditPage';
import { UsersPage } from '@/features/users/pages/UsersPage';
import { NotFoundPage } from '@/app/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'users/new',
        element: <UserCreatePage />,
      },
      {
        path: 'users/:userId',
        element: <UserDetailPage />,
      },
      {
        path: 'users/:userId/edit',
        element: <UserEditPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
