/**
 * @file このファイルは確認操作に使うモーダルダイアログを定義します。
 */

import { useEffect, useId } from 'react';
import { Button } from '@/components/ui/Button';
import { Message } from '@/constants/Message';
import type { ConfirmDialogProps } from '@/type/ui';

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = Message.ui.confirmDialog.confirmLabel,
  cancelLabel = Message.ui.confirmDialog.cancelLabel,
  isProcessing = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  const descriptionId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isProcessing) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProcessing, onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="dialog-backdrop"
      onClick={() => {
        if (!isProcessing) {
          onClose();
        }
      }}
    >
      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="dialog"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dialog__body">
          <p className="panel__eyebrow">{Message.ui.confirmDialog.eyebrow}</p>
          <h2 id={titleId}>{title}</h2>
          <p id={descriptionId}>{description}</p>
        </div>
        <div className="dialog__actions">
          <Button disabled={isProcessing} variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button disabled={isProcessing} variant="danger" onClick={onConfirm}>
            {isProcessing ? Message.ui.confirmDialog.processingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
