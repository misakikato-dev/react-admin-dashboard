/**
 * @file このファイルは疑似非同期処理で使う待機ユーティリティを定義します。
 */

export function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

