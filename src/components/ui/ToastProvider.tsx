/**
 * @file このファイルはトースト通知の状態管理と表示領域を提供します。
 */

import { useState } from 'react';
import { ToastContext } from '@/components/ui/toastContext';
import { Message } from '@/constants/Message';
import { cx } from '@/lib/cx';
import type {
  ToastContextValue,
  ToastInput,
  ToastItem,
  ToastProviderProps,
} from '@/type/toast';

let toastSequence = 1;

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (toastId: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  const showToast = ({
    title,
    description = '',
    variant = 'success',
  }: ToastInput) => {
    const nextToast: ToastItem = {
      id: toastSequence,
      title,
      description,
      variant,
    };

    toastSequence += 1;

    setToasts((current) => [...current, nextToast]);

    window.setTimeout(() => {
      removeToast(nextToast.id);
    }, 4200);
  };

  const value: ToastContextValue = {
    showToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-atomic="false" aria-live="polite" className="toast-viewport">
        {toasts.map((toast) => (
          <section
            key={toast.id}
            className={cx('toast', `toast--${toast.variant}`)}
            role="status"
          >
            <div className="toast__content">
              <strong>{toast.title}</strong>
              {toast.description ? <p>{toast.description}</p> : null}
            </div>
            <button
              aria-label={Message.ui.toast.closeAriaLabel}
              className="toast__close"
              type="button"
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </section>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
