/**
 * @file このファイルはユーザーのステータスをラベル付きバッジとして表示する UI を定義します。
 */

import {
  USER_STATUS_LABELS,
  USER_STATUS_TONE_CLASS,
} from '@/features/users/lib/userOptions';
import { cx } from '@/lib/cx';
import type { BadgeProps } from '@/type/ui';

export function Badge({ status }: BadgeProps) {
  return (
    <span className={cx('badge', USER_STATUS_TONE_CLASS[status])}>
      {USER_STATUS_LABELS[status]}
    </span>
  );
}
