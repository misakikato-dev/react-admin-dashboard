/**
 * @file このファイルはユーザー一覧テーブルと行ごとの操作 UI を定義します。
 */

import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Message } from '@/constants/Message';
import { USER_ROLE_LABELS } from '@/features/users/lib/userOptions';
import { formatDate } from '@/lib/format';
import type { UserTableProps } from '@/type/usersComponents';

export function UserTable({
  users,
  deletingUserId = null,
  onDelete,
}: UserTableProps) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">{Message.users.table.headers.user}</th>
            <th scope="col">{Message.users.table.headers.company}</th>
            <th scope="col">{Message.users.table.headers.role}</th>
            <th scope="col">{Message.users.table.headers.status}</th>
            <th scope="col">{Message.users.table.headers.joinedAt}</th>
            <th scope="col" className="data-table__actions">
              {Message.users.table.headers.actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-cell">
                  <div className="user-cell__avatar" aria-hidden="true">
                    {user.name.slice(0, 1)}
                  </div>
                  <div>
                    <Link className="user-cell__name" to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                    <div className="user-cell__sub">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>{user.company}</td>
              <td>{USER_ROLE_LABELS[user.role]}</td>
              <td>
                <Badge status={user.status} />
              </td>
              <td>{formatDate(user.joinedAt)}</td>
              <td className="data-table__actions">
                <Link className="table-link" to={`/users/${user.id}`}>
                  {Message.users.table.detail}
                </Link>
                <Link className="table-link" to={`/users/${user.id}/edit`}>
                  {Message.users.table.edit}
                </Link>
                <button
                  className="table-link table-link--button table-link--danger"
                  disabled={deletingUserId === user.id}
                  type="button"
                  onClick={() => onDelete(user)}
                >
                  {deletingUserId === user.id
                    ? Message.users.table.deleting
                    : Message.users.table.delete}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
