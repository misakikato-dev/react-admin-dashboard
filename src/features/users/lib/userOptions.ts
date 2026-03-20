/**
 * @file このファイルはユーザー機能で共有する選択肢、ラベル、補助値を定義します。
 */

import { Message } from '@/constants/Message';
import type {
  SortDirection,
  User,
  UserFormValues,
  UserRole,
  UserSortField,
  UserStatus,
} from '@/type/users';

export const USER_ROLE_OPTIONS = [
  { value: 'owner', label: Message.users.options.roles.owner },
  { value: 'admin', label: Message.users.options.roles.admin },
  { value: 'manager', label: Message.users.options.roles.manager },
  { value: 'support', label: Message.users.options.roles.support },
  { value: 'viewer', label: Message.users.options.roles.viewer },
] as const satisfies ReadonlyArray<{ value: UserRole; label: string }>;

export const USER_STATUS_OPTIONS = [
  { value: 'active', label: Message.users.options.statuses.active },
  { value: 'invited', label: Message.users.options.statuses.invited },
  { value: 'suspended', label: Message.users.options.statuses.suspended },
] as const satisfies ReadonlyArray<{ value: UserStatus; label: string }>;

export const USER_SORT_FIELD_OPTIONS = [
  { value: 'joinedAt', label: Message.users.options.sortFields.joinedAt },
  { value: 'lastActiveAt', label: Message.users.options.sortFields.lastActiveAt },
  { value: 'name', label: Message.users.options.sortFields.name },
  { value: 'company', label: Message.users.options.sortFields.company },
] as const satisfies ReadonlyArray<{ value: UserSortField; label: string }>;

export const SORT_DIRECTION_OPTIONS = [
  { value: 'desc', label: Message.users.options.sortDirections.desc },
  { value: 'asc', label: Message.users.options.sortDirections.asc },
] as const satisfies ReadonlyArray<{ value: SortDirection; label: string }>;

export const EMPTY_USER_FORM_VALUES: UserFormValues = {
  name: '',
  email: '',
  company: '',
  role: 'viewer',
  status: 'invited',
  phone: '',
  location: '',
  bio: '',
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  owner: Message.users.options.roles.owner,
  admin: Message.users.options.roles.admin,
  manager: Message.users.options.roles.manager,
  support: Message.users.options.roles.support,
  viewer: Message.users.options.roles.viewer,
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: Message.users.options.statuses.active,
  invited: Message.users.options.statuses.invited,
  suspended: Message.users.options.statuses.suspended,
};

export const USER_STATUS_TONE_CLASS: Record<UserStatus, string> = {
  active: 'badge--success',
  invited: 'badge--warning',
  suspended: 'badge--danger',
};

export function toUserFormValues(user: User): UserFormValues {
  return {
    name: user.name,
    email: user.email,
    company: user.company,
    role: user.role,
    status: user.status,
    phone: user.phone,
    location: user.location,
    bio: user.bio,
  };
}
