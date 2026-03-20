/**
 * @file このファイルはユーザー機能の component props 型を定義します。
 */

import type {
  SortDirection,
  User,
  UserRoleFilter,
  UserSortField,
  UserStatusFilter,
  UserSummary,
} from '@/type/users';
import type { UseUserFormResult } from '@/type/usersHooks';

export interface UserSummaryCardsProps {
  summary: UserSummary;
}

export interface UserTableProps {
  users: User[];
  deletingUserId?: string | null;
  onDelete: (user: User) => void;
}

export interface UserFiltersProps {
  search: string;
  status: UserStatusFilter;
  role: UserRoleFilter;
  sortBy: UserSortField;
  sortDirection: SortDirection;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: UserStatusFilter) => void;
  onRoleChange: (value: UserRoleFilter) => void;
  onSortByChange: (value: UserSortField) => void;
  onSortDirectionChange: (value: SortDirection) => void;
  onReset: () => void;
}

export interface UserFormProps {
  form: UseUserFormResult;
  cancelTo: string;
  submitLabel?: string;
}
