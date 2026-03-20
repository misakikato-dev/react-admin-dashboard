/**
 * @file このファイルは共通 UI コンポーネントの props 型を定義します。
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { UserStatus } from '@/type/users';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export interface BadgeProps {
  status: UserStatus;
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isProcessing?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SpinnerProps {
  label?: string;
}
