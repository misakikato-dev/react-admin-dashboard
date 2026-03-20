/**
 * @file このファイルは空状態やエラー状態を案内する共通 UI を定義します。
 */

import type { EmptyStateProps } from '@/type/ui';

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <section className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        01
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action ? <div className="empty-state__action">{action}</div> : null}
    </section>
  );
}
