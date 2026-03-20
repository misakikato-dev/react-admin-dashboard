/**
 * @file このファイルはユーザー新規作成画面の状態管理と送信処理を定義します。
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/useToast';
import { Message } from '@/constants/Message';
import { UserForm } from '@/features/users/components/UserForm';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { EMPTY_USER_FORM_VALUES } from '@/features/users/lib/userOptions';
import { toErrorMessage } from '@/lib/error';
import { createUser } from '@/services/users/userService';

const userCreateMessage = Message.users.pages.create;

export function UserCreatePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [saveError, setSaveError] = useState<string | null>(null);

  const form = useUserForm({
    initialValues: EMPTY_USER_FORM_VALUES,
    onSubmit: async (values) => {
      setSaveError(null);

      try {
        const createdUser = await createUser(values);

        showToast({
          title: userCreateMessage.toast.successTitle,
          description: userCreateMessage.toast.successDescription(createdUser.name),
        });
        navigate(`/users/${createdUser.id}`);
      } catch (error: unknown) {
        const message = toErrorMessage(error, userCreateMessage.toast.errorFallback);
        setSaveError(message);
        showToast({
          variant: 'error',
          title: userCreateMessage.toast.errorTitle,
          description: message,
        });
      }
    },
  });

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <Link className="inline-link" to="/users">
            {userCreateMessage.backToList}
          </Link>
          <h2>{userCreateMessage.title}</h2>
          <p className="page-hero__description">
            {userCreateMessage.description}
          </p>
        </div>
      </section>

      {saveError ? (
        <div className="alert alert--error" role="alert">
          {saveError}
        </div>
      ) : null}

      <UserForm
        cancelTo="/users"
        form={form}
        submitLabel={Message.users.form.submitCreate}
      />
    </div>
  );
}
