/**
 * @file このファイルはユーザー一覧データの取得状態と再取得処理を管理するフックを定義します。
 */

import { useEffect, useState } from 'react';
import { Message } from '@/constants/Message';
import { toErrorMessage } from '@/lib/error';
import { listUsers } from '@/services/users/userService';
import type { UserListParams } from '@/type/users';
import type { UseUserListResult, UseUserListState } from '@/type/usersHooks';

export function useUserList(params: UserListParams): UseUserListResult {
  const {
    page,
    pageSize,
    role,
    search,
    sortBy,
    sortDirection,
    status,
  } = params;
  const [state, setState] = useState<UseUserListState>({
    data: null,
    isLoading: true,
    error: null,
  });
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    let isMounted = true;

    setState((current) => ({
      data: current.data,
      isLoading: true,
      error: null,
    }));

    listUsers({
      page,
      pageSize,
      search,
      status,
      role,
      sortBy,
      sortDirection,
    })
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setState({
          data,
          isLoading: false,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        setState((current) => ({
          data: current.data,
          isLoading: false,
          error: toErrorMessage(error, Message.users.hooks.fetchListFailed),
        }));
      });

    return () => {
      isMounted = false;
    };
  }, [page, pageSize, requestVersion, role, search, sortBy, sortDirection, status]);

  return {
    ...state,
    refetch: () => setRequestVersion((current) => current + 1),
  };
}
