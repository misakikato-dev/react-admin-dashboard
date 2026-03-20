/**
 * @file このファイルは日付と日時を日本語表記で整形する関数を定義します。
 */

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}

