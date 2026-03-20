/**
 * @file このファイルは unknown な例外から表示用メッセージを取り出す補助関数を定義します。
 */

export function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}
