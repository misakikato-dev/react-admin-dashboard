/**
 * @file このファイルはユーザー一覧、絞り込み、削除導線をまとめた画面を定義します。
 */

import { startTransition, useDeferredValue, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/components/ui/useToast';
import { Message } from '@/constants/Message';
import { UserFilters } from '@/features/users/components/UserFilters';
import { UserSummaryCards } from '@/features/users/components/UserSummaryCards';
import { UserTable } from '@/features/users/components/UserTable';
import { useUserList } from '@/features/users/hooks/useUserList';
import { toErrorMessage } from '@/lib/error';
import { deleteUser } from '@/services/users/userService';
import type {
  SortDirection,
  User,
  UserRoleFilter,
  UserSortField,
  UserStatusFilter,
} from '@/type/users';

const PAGE_SIZE = 8;
const usersListMessage = Message.users.pages.list;

export function UsersPage() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatusFilter>('all');
  const [roleFilter, setRoleFilter] = useState<UserRoleFilter>('all');
  const [sortBy, setSortBy] = useState<UserSortField>('joinedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);
  const [pendingDeleteUser, setPendingDeleteUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();
  const deferredSearch = useDeferredValue(searchText);
  const trimmedSearch = deferredSearch.trim();

  const { data, isLoading, error, refetch } = useUserList({
    page,
    pageSize: PAGE_SIZE,
    search: trimmedSearch,
    status: statusFilter,
    role: roleFilter,
    sortBy,
    sortDirection,
  });

  useEffect(() => {
    if (data && page > data.totalPages) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  const handleSearchChange = (value: string) => {
    startTransition(() => {
      setSearchText(value);
      setPage(1);
    });
  };

  const handleFilterChange = <Value,>(
    setter: (value: Value) => void,
    value: Value
  ) => {
    startTransition(() => {
      setter(value);
      setPage(1);
    });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      setSearchText('');
      setStatusFilter('all');
      setRoleFilter('all');
      setSortBy('joinedAt');
      setSortDirection('desc');
      setPage(1);
    });
  };

  const hasActiveFilters =
    trimmedSearch.length > 0 ||
    statusFilter !== 'all' ||
    roleFilter !== 'all' ||
    sortBy !== 'joinedAt' ||
    sortDirection !== 'desc';

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="page-hero__eyebrow">{usersListMessage.hero.eyebrow}</p>
          <h2>{usersListMessage.hero.title}</h2>
          <p className="page-hero__description">
            {usersListMessage.hero.description}
          </p>
        </div>
        <div className="page-actions">
          <div className="page-hero__meta">
            <span>{usersListMessage.hero.metaLabel}</span>
            <strong>{usersListMessage.hero.metaCount(data?.total ?? 0)}</strong>
          </div>
          <Link className="button button--primary" to="/users/new">
            {usersListMessage.hero.add}
          </Link>
        </div>
      </section>

      {data ? <UserSummaryCards summary={data.summary} /> : null}

      <section className="panel">
        <div className="panel__header panel__header--stacked">
          <div>
            <p className="panel__eyebrow">{usersListMessage.directory.eyebrow}</p>
            <h3>{usersListMessage.directory.title}</h3>
            <p className="panel__description">
              {usersListMessage.directory.description}
            </p>
          </div>
        </div>

        <UserFilters
          hasActiveFilters={hasActiveFilters}
          role={roleFilter}
          search={searchText}
          sortBy={sortBy}
          sortDirection={sortDirection}
          status={statusFilter}
          onReset={handleResetFilters}
          onRoleChange={(value) => handleFilterChange(setRoleFilter, value)}
          onSearchChange={handleSearchChange}
          onSortByChange={(value) => handleFilterChange(setSortBy, value)}
          onSortDirectionChange={(value) =>
            handleFilterChange(setSortDirection, value)
          }
          onStatusChange={(value) => handleFilterChange(setStatusFilter, value)}
        />

        {isLoading && !data ? <Spinner label={usersListMessage.loading} /> : null}
        {isLoading && data ? <p className="panel__status">{usersListMessage.updating}</p> : null}
        {!isLoading && data ? (
          <p className="panel__status">{usersListMessage.matchedCount(data.total)}</p>
        ) : null}

        {error && !data ? (
          <EmptyState
            action={
              <Button onClick={refetch}>
                {usersListMessage.retry}
              </Button>
            }
            title={usersListMessage.fetchErrorTitle}
            description={error}
          />
        ) : null}

        {error && data ? (
          <div className="alert alert--error" role="alert">
            {usersListMessage.staleDataAlert}
          </div>
        ) : null}

        {!error && data && data.items.length === 0 ? (
          <EmptyState
            action={
              hasActiveFilters ? (
                <div className="empty-state__action-group">
                  <Button variant="ghost" onClick={handleResetFilters}>
                    {Message.users.filters.reset}
                  </Button>
                  <Link className="button button--primary" to="/users/new">
                    {usersListMessage.hero.add}
                  </Link>
                </div>
              ) : (
                <Link className="button button--primary" to="/users/new">
                  {usersListMessage.hero.add}
                </Link>
              )
            }
            title={
              hasActiveFilters
                ? usersListMessage.empty.filteredTitle
                : usersListMessage.empty.initialTitle
            }
            description={
              hasActiveFilters
                ? usersListMessage.empty.filteredDescription
                : usersListMessage.empty.initialDescription
            }
          />
        ) : null}

        {data && data.items.length > 0 ? (
          <>
            <UserTable
              deletingUserId={isDeleting ? pendingDeleteUser?.id ?? null : null}
              users={data.items}
              onDelete={(user) => setPendingDeleteUser(user)}
            />
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </>
        ) : null}
      </section>

      <ConfirmDialog
        cancelLabel={usersListMessage.deleteDialog.cancel}
        confirmLabel={usersListMessage.deleteDialog.confirm}
        description={
          pendingDeleteUser
            ? usersListMessage.deleteDialog.description(pendingDeleteUser.name)
            : ''
        }
        isProcessing={isDeleting}
        open={pendingDeleteUser !== null}
        title={usersListMessage.deleteDialog.title}
        onClose={() => {
          if (!isDeleting) {
            setPendingDeleteUser(null);
          }
        }}
        onConfirm={() => {
          if (!pendingDeleteUser) {
            return;
          }

          setIsDeleting(true);

          deleteUser(pendingDeleteUser.id)
            .then(() => {
              showToast({
                title: usersListMessage.toast.deleteSuccessTitle,
                description: usersListMessage.toast.deleteSuccessDescription(
                  pendingDeleteUser.name
                ),
              });
              setPendingDeleteUser(null);
              refetch();
            })
            .catch((deleteError: unknown) => {
              showToast({
                variant: 'error',
                title: usersListMessage.toast.deleteErrorTitle,
                description: toErrorMessage(
                  deleteError,
                  usersListMessage.toast.deleteErrorFallback
                ),
              });
            })
            .finally(() => {
              setIsDeleting(false);
            });
        }}
      />
    </div>
  );
}
