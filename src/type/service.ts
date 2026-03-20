/**
 * @file このファイルは API リクエスト補助で共有する型を定義します。
 */

export type RequestMethod = 'DELETE' | 'GET' | 'POST' | 'PUT';
export type QueryValue = string | number | undefined;

export interface RequestOptions {
  body?: unknown;
  method?: RequestMethod;
  query?: Record<string, QueryValue>;
  returnNullOnNotFound?: boolean;
}
