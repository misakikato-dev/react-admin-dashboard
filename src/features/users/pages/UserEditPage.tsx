/**
 * @file このファイルは既存ユーザーの編集画面と保存処理を定義します。
 */

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '@/components/ui/EmptyState';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/components/ui/useToast';
import { Message } from '@/constants/Message';
import { UserForm } from '@/features/users/components/UserForm';
import { useUserDetail } from '@/features/users/hooks/useUserDetail';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import {
  EMPTY_USER_FORM_VALUES,
  toUserFormValues,
} from '@/features/users/lib/userOptions';
import { toErrorMessage } from '@/lib/error';
import { updateUser } from '@/services/users/userService';

const userEditMessage = Message.users.pages.edit;

export function UserEditPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user, isLoading, error } = useUserDetail(userId);
  const { showToast } = useToast();
  const [saveError, setSaveError] = useState<string | null>(null);

  const form = useUserForm({
    initialValues: user ? toUserFormValues(user) : EMPTY_USER_FORM_VALUES,
    onSubmit: async (values) => {
      if (!userId) {
        return;
      }

      setSaveError(null);

      try {
        const updatedUser = await updateUser(userId, values);
        showToast({
          title: userEditMessage.toast.successTitle,
          description: userEditMessage.toast.successDescription(updatedUser.name),
        });
        navigate(`/users/${updatedUser.id}`);
      } catch (submitError: unknown) {
        const message = toErrorMessage(submitError, userEditMessage.toast.errorFallback);
        setSaveError(message);
        showToast({
          variant: 'error',
          title: userEditMessage.toast.errorTitle,
          description: message,
        });
      }
    },
  });

  if (isLoading) {
    return <Spinner label={userEditMessage.loading} />;
  }

  if (error) {
    return (
      <EmptyState
        title={userEditMessage.errorTitle}
        description={error}
        action={
          <Link className="button button--primary" to="/users">
            {userEditMessage.backToList}
          </Link>
        }
      />
    );
  }

  if (!user) {
    return (
      <EmptyState
        title={userEditMessage.notFoundTitle}
        description={userEditMessage.notFoundDescription}
        action={
          <Link className="button button--primary" to="/users">
            {userEditMessage.backToList}
          </Link>
        }
      />
    );
  }

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <Link className="inline-link" to={`/users/${user.id}`}>
            {userEditMessage.backToDetail}
          </Link>
          <h2>{userEditMessage.title}</h2>
          <p className="page-hero__description">
            {userEditMessage.description}
          </p>
        </div>
      </section>

      {saveError ? (
        <div className="alert alert--error" role="alert">
          {saveError}
        </div>
      ) : null}

      <UserForm cancelTo={`/users/${user.id}`} form={form} />
    </div>
  );
}
