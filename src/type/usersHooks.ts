/**
 * @file このファイルはユーザー機能の hooks で共有する型を定義します。
 */

import type { FormEvent } from 'react';
import type {
  User,
  UserFormErrors,
  UserFormValues,
  UserListResult,
} from '@/type/users';

export interface UseUserFormOptions {
  initialValues: UserFormValues;
  onSubmit: (values: UserFormValues) => Promise<void>;
}

export interface UseUserFormResult {
  values: UserFormValues;
  errors: UserFormErrors;
  isSubmitting: boolean;
  setFieldValue: <Field extends keyof UserFormValues>(
    field: Field,
    value: UserFormValues[Field]
  ) => void;
  handleBlur: (field: keyof UserFormValues) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface UseUserListState {
  data: UserListResult | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseUserListResult extends UseUserListState {
  refetch: () => void;
}

export interface UseUserDetailState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export type UseUserDetailResult = UseUserDetailState;
