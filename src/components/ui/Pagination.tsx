/**
 * @file このファイルは一覧画面用のページネーション UI を定義します。
 */

import { Button } from '@/components/ui/Button';
import { Message } from '@/constants/Message';
import type { PaginationProps } from '@/type/ui';

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination" aria-label={Message.ui.pagination.ariaLabel}>
      <Button
        disabled={currentPage === 1}
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
      >
        {Message.ui.pagination.previous}
      </Button>

      <div className="pagination__pages">
        {pageItems.map((item) => (
          <button
            key={item}
            aria-current={item === currentPage ? 'page' : undefined}
            className={`pagination__page${
              item === currentPage ? ' pagination__page--active' : ''
            }`}
            disabled={item === currentPage}
            type="button"
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <Button
        disabled={currentPage === totalPages}
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
      >
        {Message.ui.pagination.next}
      </Button>
    </nav>
  );
}
