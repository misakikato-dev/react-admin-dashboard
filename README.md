# Northwind Admin

React + TypeScript + Vite で構築した、ユーザー運用をテーマにした管理画面アプリです。ポートフォリオ公開を前提に、`clone` 直後でもバックエンドなしで動作確認できるよう、モック API を標準搭載しています。あわせて、実 API へ切り替えやすいサービス層の分離、運用画面らしい検索・絞り込み・CRUD 導線、テストと静的検証までを含めて整備しています。

## デモ

- 公開URL: https://react-admin-dashboard-peach-eta.vercel.app/
- Vercel にデプロイしているため、ローカル環境を用意しなくてもブラウザですぐに確認できます。
- デフォルトでは `mock` 環境で動作するため、一覧・詳細・作成・編集・削除の主要フローをそのまま試せます。

## アプリ概要

一覧、詳細、作成、編集、削除までのユーザー管理フローを一通り体験できるシングルページアプリケーションです。単に画面を並べるだけでなく、状態管理の責務分離、入力バリデーション、読み込み・空状態・エラー状態のハンドリング、トースト通知や確認ダイアログなど、実務に近い管理画面の振る舞いを意識して実装しています。

## 主な機能

- ユーザー一覧表示
- 検索、ステータス絞り込み、権限絞り込み、並び替え、ページネーション
- ユーザー詳細表示
- ユーザーの新規作成、編集、削除
- 入力バリデーションとフォームエラーハンドリング
- トースト通知、空状態表示、エラー表示、削除確認ダイアログ
- `mock` / `staging` / `production` の API 接続先切り替え
- Vitest + Testing Library によるユニットテスト

## 技術スタック

- React 18
- TypeScript 5
- Vite 5
- React Router DOM 6
- ESLint 9
- Vitest
- Testing Library
- jsdom
- CSS Modules ではなく、プレーンな CSS とコンポーネント設計で UI を構成

## セットアップ手順

### 前提環境

- Node.js 20 以上
- npm 10 以上

### 起動方法

```bash
npm install
cp .env.example .env.local
npm run dev
```

ブラウザで `http://localhost:5173` を開くと確認できます。

このリポジトリはデフォルトで `mock` 環境を使用するため、バックエンドを用意しなくても起動可能です。レビュー担当者や採用担当者が `clone` 後すぐに画面を確認できる構成にしています。

### 環境変数

`.env.example` を `.env.local` にコピーして利用してください。

```bash
VITE_API_ENVIRONMENT=mock
```

利用可能な値:

- `mock`
- `staging`
- `production`

`staging` または `production` を使う場合は `VITE_API_BASE_URL` の指定が必要です。

```bash
VITE_API_ENVIRONMENT=staging
VITE_API_BASE_URL=https://api.example.com
```

### 実 API 利用時の想定エンドポイント

- `GET /users`
- `GET /users/:userId`
- `POST /users`
- `PUT /users/:userId`
- `DELETE /users/:userId`

## 利用可能なスクリプト

- `npm run dev`: 開発サーバーを起動
- `npm run build`: 型チェック後に本番ビルドを生成
- `npm run preview`: 本番ビルドをローカル確認
- `npm run lint`: ESLint を実行
- `npm run typecheck`: TypeScript の型チェックを実行
- `npm run test`: ユニットテストを実行
- `npm run check`: lint / typecheck / test をまとめて実行

## ディレクトリ構成

```text
.
├── public/
├── src/
│   ├── app/                  # ルーター、アプリ全体のエントリ
│   ├── components/
│   │   ├── layout/           # 共通レイアウト
│   │   └── ui/               # 汎用 UI コンポーネント
│   ├── constants/            # 画面文言の集約
│   ├── features/users/       # ユーザー管理機能
│   │   ├── components/       # 機能固有 UI
│   │   ├── hooks/            # 画面用カスタムフック
│   │   ├── lib/              # 変換・定数
│   │   ├── pages/            # 一覧、詳細、作成、編集ページ
│   │   └── utils/            # バリデーション
│   ├── lib/                  # 共通ユーティリティ
│   ├── services/             # API / モック切り替え層
│   ├── styles/               # グローバルスタイル
│   ├── test/                 # テストセットアップ
│   └── type/                 # 型定義
├── .env.example
├── eslint.config.js
├── package.json
└── vite.config.ts
```

## 工夫した点

- `mock` をデフォルトにして、第三者がバックエンドなしで即確認できるようにしました。
- `pages`、`hooks`、`services`、`ui components` に責務を分離し、変更影響を局所化しやすい構成にしています。
- 検索や絞り込みの状態変更には `startTransition` と `useDeferredValue` を使い、一覧画面の操作感を損ねにくくしています。
- 接続先環境の切り替えを UI 上でも可視化し、モック利用時と実 API 利用時の差分を把握しやすくしました。
- 読み込み中、空状態、取得失敗、古いデータ表示中など、管理画面で起こりやすい状態を明示的に分けています。
- 文言を `Message` 定数へ集約し、将来的な i18n やコピー改善にも対応しやすい形にしています。

## 今後の改善点

- TanStack Query 導入によるサーバー状態管理とキャッシュ戦略の強化
- 認証、認可、ロールベースアクセス制御の追加
- Playwright などを用いた E2E テストの追加
- OpenAPI などを用いた API スキーマ駆動の型生成
- ダッシュボード指標や監査ログなど、管理画面らしい機能の拡張
