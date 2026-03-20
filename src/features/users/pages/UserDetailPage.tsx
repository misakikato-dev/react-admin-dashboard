/**
 * @file このファイルはユーザー詳細表示と削除操作を扱う画面を定義します。
 */

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/components/ui/useToast';
import { Message } from '@/constants/Message';
import { useUserDetail } from '@/features/users/hooks/useUserDetail';
import { USER_ROLE_LABELS } from '@/features/users/lib/userOptions';
import { toErrorMessage } from '@/lib/error';
import { deleteUser } from '@/services/users/userService';
import { formatDate, formatDateTime } from '@/lib/format';

const userDetailMessage = Message.users.pages.detail;

export function UserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user, isLoading, error } = useUserDetail(userId);
  const { showToast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) {
    return <Spinner label={userDetailMessage.loading} />;
  }

  if (error) {
    return (
      <EmptyState
        title={userDetailMessage.errorTitle}
        description={error}
        action={
          <Link className="button button--primary" to="/users">
            {userDetailMessage.backToList}
          </Link>
        }
      />
    );
  }

  if (!user) {
    return (
      <EmptyState
        title={userDetailMessage.notFoundTitle}
        description={userDetailMessage.notFoundDescription}
        action={
          <Link className="button button--primary" to="/users">
            {userDetailMessage.backToList}
          </Link>
        }
      />
    );
  }

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <Link className="inline-link" to="/users">
            {userDetailMessage.backToUsers}
          </Link>
          <h2>{user.name}</h2>
          <p className="page-hero__description">{user.email}</p>
        </div>
        <div className="hero-actions">
          <Badge status={user.status} />
          <div className="hero-actions__buttons">
            <Link className="button button--primary" to={`/users/${user.id}/edit`}>
              {userDetailMessage.edit}
            </Link>
            <Button
              disabled={isDeleting}
              variant="danger"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              {isDeleting ? userDetailMessage.deleting : userDetailMessage.delete}
            </Button>
          </div>
        </div>
      </section>

      <div className="detail-grid">
        <article className="panel detail-card">
          <p className="panel__eyebrow">{userDetailMessage.overviewEyebrow}</p>
          <h3>{userDetailMessage.profileTitle}</h3>
          <p className="detail-card__bio">{user.bio}</p>

          <div className="chip-row">
            <span className="info-chip">{USER_ROLE_LABELS[user.role]}</span>
            <span className="info-chip">{user.company}</span>
            <span className="info-chip">{user.location}</span>
          </div>
        </article>

        <article className="panel detail-card">
          <p className="panel__eyebrow">{userDetailMessage.metadataEyebrow}</p>
          <h3>{userDetailMessage.operationsTitle}</h3>
          <dl className="detail-list">
            <div>
              <dt>{userDetailMessage.fields.company}</dt>
              <dd>{user.company}</dd>
            </div>
            <div>
              <dt>{userDetailMessage.fields.role}</dt>
              <dd>{USER_ROLE_LABELS[user.role]}</dd>
            </div>
            <div>
              <dt>{userDetailMessage.fields.phone}</dt>
              <dd>{user.phone}</dd>
            </div>
            <div>
              <dt>{userDetailMessage.fields.location}</dt>
              <dd>{user.location}</dd>
            </div>
            <div>
              <dt>{userDetailMessage.fields.joinedAt}</dt>
              <dd>{formatDate(user.joinedAt)}</dd>
            </div>
            <div>
              <dt>{userDetailMessage.fields.lastActiveAt}</dt>
              <dd>{formatDateTime(user.lastActiveAt)}</dd>
            </div>
          </dl>
        </article>
      </div>

      <ConfirmDialog
        cancelLabel={userDetailMessage.deleteDialog.cancel}
        confirmLabel={userDetailMessage.deleteDialog.confirm}
        description={userDetailMessage.deleteDialog.description(user.name)}
        isProcessing={isDeleting}
        open={isDeleteDialogOpen}
        title={userDetailMessage.deleteDialog.title}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          setIsDeleting(true);

          deleteUser(user.id)
            .then(() => {
              showToast({
                title: userDetailMessage.toast.deleteSuccessTitle,
                description: userDetailMessage.toast.deleteSuccessDescription(
                  user.name
                ),
              });
              navigate('/users', { replace: true });
            })
            .catch((deleteError: unknown) => {
              showToast({
                variant: 'error',
                title: userDetailMessage.toast.deleteErrorTitle,
                description: toErrorMessage(
                  deleteError,
                  userDetailMessage.toast.deleteErrorFallback
                ),
              });
            })
            .finally(() => {
              setIsDeleting(false);
              setIsDeleteDialogOpen(false);
            });
        }}
      />
    </div>
  );
}
