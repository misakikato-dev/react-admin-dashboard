/**
 * @file このファイルはトースト通知とルーターをまとめるアプリケーションのルートコンポーネントを定義します。
 */

import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { ToastProvider } from '@/components/ui/ToastProvider';

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}
