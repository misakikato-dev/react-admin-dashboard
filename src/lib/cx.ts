/**
 * @file このファイルは条件付きクラス名を連結するユーティリティを定義します。
 */

export function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

