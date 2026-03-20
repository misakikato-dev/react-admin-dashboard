/**
 * @file このファイルはアプリケーション全体で利用する表示文言を集約します。
 */

export const Message = {
  app: {
    notFound: {
      title: 'ページが見つかりません',
      description: 'URLを確認するか、ユーザー一覧に戻って操作を続けてください。',
      action: 'ユーザー一覧へ戻る',
    },
    shell: {
      brand: {
        eyebrow: 'Operations Console',
        title: 'Northwind Admin',
      },
      navigation: {
        ariaLabel: 'Main navigation',
        users: {
          label: 'ユーザー管理',
          description: '一覧、詳細、作成、編集',
        },
      },
      operationsMemo: {
        title: '運用メモ',
        environmentPrefix: 'APIの接続先は ',
        environmentVariable: 'VITE_API_ENVIRONMENT',
        environmentSuffix: ' による環境切り替えに対応しています。',
        line2: 'モックAPIと実APIの差し替えを容易にし、開発効率を高めています。',
        line3: 'また、検索・絞り込み・CRUD処理はUIから分離し、',
        line4: 'カスタムフック・サービス層に責務を分割しています。',
        line5: '拡張性・保守性を重視した設計としています。',
      },
      topbar: {
        eyebrow: 'Admin Dashboard',
        title: 'ユーザー運用ワークスペース',
        environmentLabel: 'Environment',
      },
    },
  },
  ui: {
    confirmDialog: {
      eyebrow: 'Confirmation',
      confirmLabel: '実行する',
      cancelLabel: 'キャンセル',
      processingLabel: '処理中...',
    },
    pagination: {
      ariaLabel: 'Pagination',
      previous: '前へ',
      next: '次へ',
    },
    spinner: {
      label: '読み込み中...',
    },
    toast: {
      closeAriaLabel: '通知を閉じる',
    },
  },
  users: {
    options: {
      roles: {
        owner: 'オーナー',
        admin: '管理者',
        manager: 'マネージャー',
        support: 'サポート',
        viewer: '閲覧者',
      },
      statuses: {
        active: '稼働中',
        invited: '招待中',
        suspended: '停止中',
      },
      sortFields: {
        joinedAt: '登録日',
        lastActiveAt: '最終アクティブ',
        name: '氏名',
        company: '会社名',
      },
      sortDirections: {
        desc: '降順',
        asc: '昇順',
      },
      all: 'すべて',
    },
    summary: {
      ariaLabel: 'User summary',
      total: '総ユーザー数',
      active: '稼働中',
      invited: '招待中',
      suspended: '停止中',
    },
    filters: {
      ariaLabel: 'ユーザー一覧の絞り込みと並び替え',
      search: '検索',
      searchPlaceholder: '氏名、メール、会社名、所在地で検索',
      status: 'ステータス',
      role: '権限',
      sortField: '並び替え項目',
      sortDirection: '並び順',
      reset: '条件をリセット',
    },
    table: {
      headers: {
        user: 'ユーザー',
        company: '会社',
        role: '権限',
        status: 'ステータス',
        joinedAt: '登録日',
        actions: '操作',
      },
      detail: '詳細',
      edit: '編集',
      delete: '削除',
      deleting: '削除中...',
    },
    form: {
      submit: '保存する',
      submitCreate: 'ユーザーを作成',
      submitting: '保存中...',
      cancel: 'キャンセル',
      characterCount: (current: number, max: number) => `${current}/${max}文字`,
      fields: {
        name: {
          label: '氏名',
          placeholder: '例: 青木 美咲',
        },
        email: {
          label: 'メールアドレス',
          placeholder: 'name@example.com',
        },
        company: {
          label: '会社名',
          placeholder: '例: Northwind JP',
        },
        role: {
          label: '権限',
        },
        status: {
          label: 'ステータス',
        },
        phone: {
          label: '電話番号',
          placeholder: '例: 090-1234-5678',
        },
        location: {
          label: '所在地',
          placeholder: '例: 東京',
        },
        bio: {
          label: 'プロフィール',
          placeholder: '担当範囲や運用メモを入力してください',
        },
      },
    },
    validation: {
      required: {
        name: '氏名は必須です。',
        email: 'メールアドレスは必須です。',
        company: '会社名は必須です。',
        phone: '電話番号は必須です。',
        location: '所在地は必須です。',
      },
      invalidEmail: '有効なメールアドレスを入力してください。',
      invalidPhone: '電話番号は数字、スペース、記号のみで入力してください。',
      maxLength: (fieldName: string, maxLength: number) =>
        `${fieldName}は${maxLength}文字以内で入力してください。`,
    },
    hooks: {
      missingUserId: 'ユーザーIDが指定されていません。',
      fetchListFailed: 'ユーザー一覧の取得に失敗しました。',
      fetchDetailFailed: 'ユーザー詳細の取得に失敗しました。',
    },
    service: {
      api: {
        badRequest: 'リクエスト内容が不正です。',
        unauthorized: '認証が必要です。',
        forbidden: 'この操作を実行する権限がありません。',
        notFound: '指定したリソースが見つかりません。',
        conflict: '同時更新が競合しました。',
        unprocessableEntity: '入力内容を確認してください。',
        requestFailed: (status: number) =>
          `API リクエストに失敗しました。(${status})`,
        connectionFailed: (environmentLabel: string) =>
          `${environmentLabel} に接続できませんでした。VITE_API_BASE_URL を確認してください。`,
      },
      mock: {
        duplicateEmail: '同じメールアドレスのユーザーが既に登録されています。',
        userNotFound: '指定したユーザーが存在しません。',
      },
    },
    pages: {
      create: {
        backToList: '← ユーザー一覧へ戻る',
        title: 'ユーザー新規作成',
        description: '運用チームに追加するアカウント情報を入力します。',
        toast: {
          successTitle: 'ユーザーを作成しました',
          successDescription: (userName: string) =>
            `${userName} をディレクトリへ追加しました。`,
          errorTitle: 'ユーザーを作成できませんでした',
          errorFallback: 'ユーザーの作成に失敗しました。',
        },
      },
      detail: {
        loading: 'ユーザー詳細を読み込んでいます...',
        errorTitle: 'ユーザー詳細を表示できません',
        notFoundTitle: 'ユーザーが見つかりません',
        notFoundDescription: '指定したユーザーは存在しないか、削除されています。',
        backToList: '一覧へ戻る',
        backToUsers: '← ユーザー一覧へ戻る',
        edit: '編集する',
        delete: '削除する',
        deleting: '削除中...',
        overviewEyebrow: 'Overview',
        profileTitle: 'プロフィール',
        metadataEyebrow: 'Metadata',
        operationsTitle: '運用情報',
        fields: {
          company: '会社名',
          role: '権限',
          phone: '電話番号',
          location: '所在地',
          joinedAt: '登録日',
          lastActiveAt: '最終アクティブ',
        },
        deleteDialog: {
          cancel: '詳細へ戻る',
          confirm: '削除する',
          title: 'ユーザーを削除しますか？',
          description: (userName: string) =>
            `${userName} を削除します。この操作は取り消せません。`,
        },
        toast: {
          deleteSuccessTitle: 'ユーザーを削除しました',
          deleteSuccessDescription: (userName: string) =>
            `${userName} をディレクトリから削除しました。`,
          deleteErrorTitle: 'ユーザーを削除できませんでした',
          deleteErrorFallback: 'ユーザーの削除に失敗しました。',
        },
      },
      edit: {
        loading: '編集データを読み込んでいます...',
        errorTitle: '編集画面を表示できません',
        notFoundTitle: '対象ユーザーが見つかりません',
        notFoundDescription: '編集対象のユーザーが存在しません。',
        backToList: '一覧へ戻る',
        backToDetail: '← 詳細へ戻る',
        title: 'ユーザー編集',
        description: '必須チェックと文字数制限を含むフォームで情報を更新します。',
        toast: {
          successTitle: 'ユーザー情報を更新しました',
          successDescription: (userName: string) =>
            `${userName} の設定を保存しました。`,
          errorTitle: '変更を保存できませんでした',
          errorFallback: '保存に失敗しました。',
        },
      },
      list: {
        hero: {
          eyebrow: 'User Administration',
          title: 'ユーザー一覧',
          description: 'テーブル、検索、ページネーションを備えた運用向けの一覧画面です。',
          metaLabel: 'Mock Service',
          metaCount: (total: number) => `${total} users`,
          add: 'ユーザーを追加',
        },
        directory: {
          eyebrow: 'Directory',
          title: 'ユーザーディレクトリ',
          description:
            '氏名、ステータス、権限、並び順を組み合わせて対象ユーザーを絞り込めます。',
        },
        loading: 'ユーザー一覧を読み込んでいます...',
        updating: '一覧を更新中...',
        matchedCount: (total: number) => `条件に一致するユーザーは ${total} 件です。`,
        fetchErrorTitle: '一覧の取得に失敗しました',
        retry: '再試行',
        staleDataAlert:
          '最新の一覧を取得できませんでした。表示中のデータを確認してください。',
        empty: {
          filteredTitle: '条件に一致するユーザーが見つかりません',
          filteredDescription: '検索条件や絞り込み条件を変更して再度お試しください。',
          initialTitle: '登録済みユーザーがありません',
          initialDescription:
            '最初のユーザーを作成してディレクトリの運用を開始してください。',
        },
        deleteDialog: {
          cancel: '一覧へ戻る',
          confirm: '削除する',
          title: 'ユーザーを削除しますか？',
          description: (userName: string) =>
            `${userName} を削除します。この操作は取り消せません。`,
        },
        toast: {
          deleteSuccessTitle: 'ユーザーを削除しました',
          deleteSuccessDescription: (userName: string) => `${userName} を削除しました。`,
          deleteErrorTitle: 'ユーザーを削除できませんでした',
          deleteErrorFallback: 'ユーザーの削除に失敗しました。',
        },
      },
    },
  },
} as const;
