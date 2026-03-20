/**
 * @file このファイルはトースト通知コンテキストへ安全にアクセスするフックを定義します。
 */

import { useContext } from 'react';
import { ToastContext } from '@/components/ui/toastContext';

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider.');
  }

  return context;
}
