/**
 * @file このファイルは存在しないルートに対する案内画面を定義します。
 */

import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/ui/EmptyState';
import { Message } from '@/constants/Message';

export function NotFoundPage() {
  return (
    <EmptyState
      title={Message.app.notFound.title}
      description={Message.app.notFound.description}
      action={
        <Link className="button button--primary" to="/users">
          {Message.app.notFound.action}
        </Link>
      }
    />
  );
}
