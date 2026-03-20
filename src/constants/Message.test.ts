/**
 * @file このテストは動的メッセージと主要な静的メッセージ定義を検証します。
 */

import { describe, expect, it } from 'vitest';
import { Message } from './Message';

describe('Message', () => {
  it('ユーザー機能の静的メッセージを返す', () => {
    expect(Message.users.hooks.missingUserId).toBe(
      'ユーザーIDが指定されていません。'
    );
    expect(Message.users.hooks.fetchListFailed).toBe(
      'ユーザー一覧の取得に失敗しました。'
    );
    expect(Message.users.hooks.fetchDetailFailed).toBe(
      'ユーザー詳細の取得に失敗しました。'
    );

    expect(Message.users.service.api.badRequest).toBe(
      'リクエスト内容が不正です。'
    );
    expect(Message.users.service.api.unauthorized).toBe('認証が必要です。');
    expect(Message.users.service.api.forbidden).toBe(
      'この操作を実行する権限がありません。'
    );
    expect(Message.users.service.api.notFound).toBe(
      '指定したリソースが見つかりません。'
    );
    expect(Message.users.service.api.conflict).toBe('同時更新が競合しました。');
    expect(Message.users.service.api.unprocessableEntity).toBe(
      '入力内容を確認してください。'
    );
    expect(Message.users.service.mock.duplicateEmail).toBe(
      '同じメールアドレスのユーザーが既に登録されています。'
    );
    expect(Message.users.service.mock.userNotFound).toBe(
      '指定したユーザーが存在しません。'
    );

    expect(Message.users.pages.create.backToList).toBe('← ユーザー一覧へ戻る');
    expect(Message.users.pages.create.title).toBe('ユーザー新規作成');
    expect(Message.users.pages.create.description).toBe(
      '運用チームに追加するアカウント情報を入力します。'
    );
    expect(Message.users.pages.create.toast.successTitle).toBe(
      'ユーザーを作成しました'
    );
    expect(Message.users.pages.create.toast.errorTitle).toBe(
      'ユーザーを作成できませんでした'
    );
    expect(Message.users.pages.create.toast.errorFallback).toBe(
      'ユーザーの作成に失敗しました。'
    );

    expect(Message.users.pages.detail.loading).toBe(
      'ユーザー詳細を読み込んでいます...'
    );
    expect(Message.users.pages.detail.errorTitle).toBe(
      'ユーザー詳細を表示できません'
    );
    expect(Message.users.pages.detail.notFoundTitle).toBe(
      'ユーザーが見つかりません'
    );
    expect(Message.users.pages.detail.notFoundDescription).toBe(
      '指定したユーザーは存在しないか、削除されています。'
    );
    expect(Message.users.pages.detail.backToList).toBe('一覧へ戻る');
    expect(Message.users.pages.detail.backToUsers).toBe('← ユーザー一覧へ戻る');
    expect(Message.users.pages.detail.edit).toBe('編集する');
    expect(Message.users.pages.detail.delete).toBe('削除する');
    expect(Message.users.pages.detail.deleting).toBe('削除中...');
    expect(Message.users.pages.detail.overviewEyebrow).toBe('Overview');
    expect(Message.users.pages.detail.profileTitle).toBe('プロフィール');
    expect(Message.users.pages.detail.metadataEyebrow).toBe('Metadata');
    expect(Message.users.pages.detail.operationsTitle).toBe('運用情報');
    expect(Message.users.pages.detail.fields.company).toBe('会社名');
    expect(Message.users.pages.detail.fields.role).toBe('権限');
    expect(Message.users.pages.detail.fields.phone).toBe('電話番号');
    expect(Message.users.pages.detail.fields.location).toBe('所在地');
    expect(Message.users.pages.detail.fields.joinedAt).toBe('登録日');
    expect(Message.users.pages.detail.fields.lastActiveAt).toBe(
      '最終アクティブ'
    );
    expect(Message.users.pages.detail.deleteDialog.cancel).toBe('詳細へ戻る');
    expect(Message.users.pages.detail.deleteDialog.confirm).toBe('削除する');
    expect(Message.users.pages.detail.deleteDialog.title).toBe(
      'ユーザーを削除しますか？'
    );
    expect(Message.users.pages.detail.toast.deleteSuccessTitle).toBe(
      'ユーザーを削除しました'
    );
    expect(Message.users.pages.detail.toast.deleteErrorTitle).toBe(
      'ユーザーを削除できませんでした'
    );
    expect(Message.users.pages.detail.toast.deleteErrorFallback).toBe(
      'ユーザーの削除に失敗しました。'
    );

    expect(Message.users.pages.edit.loading).toBe(
      '編集データを読み込んでいます...'
    );
    expect(Message.users.pages.edit.errorTitle).toBe(
      '編集画面を表示できません'
    );
    expect(Message.users.pages.edit.notFoundTitle).toBe(
      '対象ユーザーが見つかりません'
    );
    expect(Message.users.pages.edit.notFoundDescription).toBe(
      '編集対象のユーザーが存在しません。'
    );
    expect(Message.users.pages.edit.backToList).toBe('一覧へ戻る');
    expect(Message.users.pages.edit.backToDetail).toBe('← 詳細へ戻る');
    expect(Message.users.pages.edit.title).toBe('ユーザー編集');
    expect(Message.users.pages.edit.description).toBe(
      '必須チェックと文字数制限を含むフォームで情報を更新します。'
    );
    expect(Message.users.pages.edit.toast.successTitle).toBe(
      'ユーザー情報を更新しました'
    );
    expect(Message.users.pages.edit.toast.errorTitle).toBe(
      '変更を保存できませんでした'
    );
    expect(Message.users.pages.edit.toast.errorFallback).toBe(
      '保存に失敗しました。'
    );

    expect(Message.users.pages.list.hero.eyebrow).toBe('User Administration');
    expect(Message.users.pages.list.hero.title).toBe('ユーザー一覧');
    expect(Message.users.pages.list.hero.description).toBe(
      'テーブル、検索、ページネーションを備えた運用向けの一覧画面です。'
    );
    expect(Message.users.pages.list.hero.metaLabel).toBe('Mock Service');
    expect(Message.users.pages.list.hero.add).toBe('ユーザーを追加');
    expect(Message.users.pages.list.directory.eyebrow).toBe('Directory');
    expect(Message.users.pages.list.directory.title).toBe(
      'ユーザーディレクトリ'
    );
    expect(Message.users.pages.list.directory.description).toBe(
      '氏名、ステータス、権限、並び順を組み合わせて対象ユーザーを絞り込めます。'
    );
    expect(Message.users.pages.list.loading).toBe(
      'ユーザー一覧を読み込んでいます...'
    );
    expect(Message.users.pages.list.updating).toBe('一覧を更新中...');
    expect(Message.users.pages.list.fetchErrorTitle).toBe(
      '一覧の取得に失敗しました'
    );
    expect(Message.users.pages.list.retry).toBe('再試行');
    expect(Message.users.pages.list.staleDataAlert).toBe(
      '最新の一覧を取得できませんでした。表示中のデータを確認してください。'
    );
    expect(Message.users.pages.list.empty.filteredTitle).toBe(
      '条件に一致するユーザーが見つかりません'
    );
    expect(Message.users.pages.list.empty.filteredDescription).toBe(
      '検索条件や絞り込み条件を変更して再度お試しください。'
    );
    expect(Message.users.pages.list.empty.initialTitle).toBe(
      '登録済みユーザーがありません'
    );
    expect(Message.users.pages.list.empty.initialDescription).toBe(
      '最初のユーザーを作成してディレクトリの運用を開始してください。'
    );
    expect(Message.users.pages.list.deleteDialog.cancel).toBe('一覧へ戻る');
    expect(Message.users.pages.list.deleteDialog.confirm).toBe('削除する');
    expect(Message.users.pages.list.deleteDialog.title).toBe(
      'ユーザーを削除しますか？'
    );
    expect(Message.users.pages.list.toast.deleteSuccessTitle).toBe(
      'ユーザーを削除しました'
    );
    expect(Message.users.pages.list.toast.deleteErrorTitle).toBe(
      'ユーザーを削除できませんでした'
    );
    expect(Message.users.pages.list.toast.deleteErrorFallback).toBe(
      'ユーザーの削除に失敗しました。'
    );
  });

  it('ユーザー機能の動的メッセージを返す', () => {
    expect(Message.users.validation.maxLength('氏名', 40)).toBe(
      '氏名は40文字以内で入力してください。'
    );
    expect(Message.users.service.api.requestFailed(500)).toBe(
      'API リクエストに失敗しました。(500)'
    );
    expect(Message.users.service.api.connectionFailed('Mock API')).toBe(
      'Mock API に接続できませんでした。VITE_API_BASE_URL を確認してください。'
    );
    expect(
      Message.users.pages.create.toast.successDescription('青木 美咲')
    ).toBe('青木 美咲 をディレクトリへ追加しました。');
    expect(
      Message.users.pages.detail.deleteDialog.description('青木 美咲')
    ).toBe('青木 美咲 を削除します。この操作は取り消せません。');
    expect(
      Message.users.pages.detail.toast.deleteSuccessDescription('青木 美咲')
    ).toBe('青木 美咲 をディレクトリから削除しました。');
    expect(
      Message.users.pages.edit.toast.successDescription('青木 美咲')
    ).toBe('青木 美咲 の設定を保存しました。');
    expect(Message.users.pages.list.hero.metaCount(42)).toBe('42 users');
    expect(Message.users.pages.list.matchedCount(3)).toBe(
      '条件に一致するユーザーは 3 件です。'
    );
    expect(
      Message.users.pages.list.deleteDialog.description('青木 美咲')
    ).toBe('青木 美咲 を削除します。この操作は取り消せません。');
    expect(
      Message.users.pages.list.toast.deleteSuccessDescription('青木 美咲')
    ).toBe('青木 美咲 を削除しました。');
  });
});
