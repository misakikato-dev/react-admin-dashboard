/**
 * @file このファイルはトースト通知で共有する型を定義します。
 */

import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'error';

export interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export interface ToastItem extends Required<ToastInput> {
  id: number;
}

export interface ToastContextValue {
  showToast: (input: ToastInput) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}
