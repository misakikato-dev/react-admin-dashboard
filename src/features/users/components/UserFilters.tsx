/**
 * @file このファイルはユーザー一覧の検索、絞り込み、並び替え UI を定義します。
 */

import { Button } from '@/components/ui/Button';
import { Message } from '@/constants/Message';
import {
  SORT_DIRECTION_OPTIONS,
  USER_ROLE_OPTIONS,
  USER_SORT_FIELD_OPTIONS,
  USER_STATUS_OPTIONS,
} from '@/features/users/lib/userOptions';
import type {
  SortDirection,
  UserRoleFilter,
  UserSortField,
  UserStatusFilter,
} from '@/type/users';
import type { UserFiltersProps } from '@/type/usersComponents';

export function UserFilters({
  search,
  status,
  role,
  sortBy,
  sortDirection,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onRoleChange,
  onSortByChange,
  onSortDirectionChange,
  onReset,
}: UserFiltersProps) {
  return (
    <section className="toolbar" aria-label={Message.users.filters.ariaLabel}>
      <div className="toolbar-grid">
        <label className="toolbar-field" htmlFor="user-search">
          <span className="toolbar-field__label">{Message.users.filters.search}</span>
          <input
            id="user-search"
            className="search-input"
            placeholder={Message.users.filters.searchPlaceholder}
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label className="toolbar-field" htmlFor="user-status-filter">
          <span className="toolbar-field__label">{Message.users.filters.status}</span>
          <select
            id="user-status-filter"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as UserStatusFilter)
            }
          >
            <option value="all">{Message.users.options.all}</option>
            {USER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="toolbar-field" htmlFor="user-role-filter">
          <span className="toolbar-field__label">{Message.users.filters.role}</span>
          <select
            id="user-role-filter"
            value={role}
            onChange={(event) => onRoleChange(event.target.value as UserRoleFilter)}
          >
            <option value="all">{Message.users.options.all}</option>
            {USER_ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="toolbar-field" htmlFor="user-sort-field">
          <span className="toolbar-field__label">{Message.users.filters.sortField}</span>
          <select
            id="user-sort-field"
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value as UserSortField)}
          >
            {USER_SORT_FIELD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="toolbar-field" htmlFor="user-sort-direction">
          <span className="toolbar-field__label">
            {Message.users.filters.sortDirection}
          </span>
          <select
            id="user-sort-direction"
            value={sortDirection}
            onChange={(event) =>
              onSortDirectionChange(event.target.value as SortDirection)
            }
          >
            {SORT_DIRECTION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="toolbar-actions">
        <Button disabled={!hasActiveFilters} variant="ghost" onClick={onReset}>
          {Message.users.filters.reset}
        </Button>
      </div>
    </section>
  );
}
