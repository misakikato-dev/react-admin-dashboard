/**
 * @file このファイルは読み込み中の状態を示すスピナー UI を定義します。
 */

import { Message } from '@/constants/Message';
import type { SpinnerProps } from '@/type/ui';

export function Spinner({ label = Message.ui.spinner.label }: SpinnerProps) {
  return (
    <div className="spinner-block" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
