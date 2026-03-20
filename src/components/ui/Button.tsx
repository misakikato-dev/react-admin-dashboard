/**
 * @file このファイルは見た目のバリアントを切り替えられる共通ボタンを定義します。
 */

import { cx } from '@/lib/cx';
import type { ButtonProps } from '@/type/ui';

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx('button', `button--${variant}`, className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
