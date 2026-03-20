/**
 * @file このファイルはユーザー詳細データの取得状態を管理するフックを定義します。
 */

import { useEffect, useState } from 'react';
import { Message } from '@/constants/Message';
import { toErrorMessage } from '@/lib/error';
import { getUserById } from '@/services/users/userService';
import type { UseUserDetailResult, UseUserDetailState } from '@/type/usersHooks';

export function useUserDetail(
  userId: string | undefined
): UseUserDetailResult {
  const [state, setState] = useState<UseUserDetailState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!userId) {
      setState({
        user: null,
        isLoading: false,
        error: Message.users.hooks.missingUserId,
      });
      return;
    }

    let isMounted = true;

    setState({
      user: null,
      isLoading: true,
      error: null,
    });

    getUserById(userId)
      .then((user) => {
        if (!isMounted) {
          return;
        }

        setState({
          user,
          isLoading: false,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        setState({
          user: null,
          isLoading: false,
          error: toErrorMessage(error, Message.users.hooks.fetchDetailFailed),
        });
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return state;
}
