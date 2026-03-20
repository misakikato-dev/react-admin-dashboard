/**
 * @file このファイルはユーザー機能で共有するドメイン型を定義します。
 */

export type UserRole = 'owner' | 'admin' | 'manager' | 'support' | 'viewer';
export type UserStatus = 'active' | 'invited' | 'suspended';
export type UserSortField = 'joinedAt' | 'lastActiveAt' | 'name' | 'company';
export type SortDirection = 'desc' | 'asc';

export type UserRoleFilter = UserRole | 'all';
export type UserStatusFilter = UserStatus | 'all';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: UserRole;
  status: UserStatus;
  bio: string;
  phone: string;
  location: string;
  joinedAt: string;
  lastActiveAt: string;
}

export interface UserSummary {
  totalUsers: number;
  activeUsers: number;
  invitedUsers: number;
  suspendedUsers: number;
}

export interface UserListParams {
  page: number;
  pageSize: number;
  search: string;
  status: UserStatusFilter;
  role: UserRoleFilter;
  sortBy: UserSortField;
  sortDirection: SortDirection;
}

export interface UserListResult {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  summary: UserSummary;
}

export interface UserFormValues {
  name: string;
  email: string;
  company: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  location: string;
  bio: string;
}

export type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;
