/// <reference types="vite/client" />

/**
 * @file この宣言は Vite の環境変数型を拡張します。
 */


interface ImportMetaEnv {
  readonly VITE_API_ENVIRONMENT?: 'mock' | 'staging' | 'production'
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
