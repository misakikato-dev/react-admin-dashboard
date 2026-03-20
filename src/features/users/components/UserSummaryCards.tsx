/**
 * @file このファイルはユーザー件数のサマリーカード群を表示します。
 */

import { Message } from '@/constants/Message';
import type { UserSummaryCardsProps } from '@/type/usersComponents';

export function UserSummaryCards({ summary }: UserSummaryCardsProps) {
  const items = [
    {
      label: Message.users.summary.total,
      value: summary.totalUsers,
      tone: 'summary-card--neutral',
    },
    {
      label: Message.users.summary.active,
      value: summary.activeUsers,
      tone: 'summary-card--success',
    },
    {
      label: Message.users.summary.invited,
      value: summary.invitedUsers,
      tone: 'summary-card--warning',
    },
    {
      label: Message.users.summary.suspended,
      value: summary.suspendedUsers,
      tone: 'summary-card--danger',
    },
  ];

  return (
    <section className="summary-grid" aria-label={Message.users.summary.ariaLabel}>
      {items.map((item) => (
        <article key={item.label} className={`summary-card ${item.tone}`}>
          <p className="summary-card__label">{item.label}</p>
          <p className="summary-card__value">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
