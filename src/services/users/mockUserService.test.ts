/**
 * @file このテストはモックユーザーサービスの一覧、作成、更新動作を検証します。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { UserFormValues, UserListParams } from '@/type/users';

const baseListParams: UserListParams = {
  page: 1,
  pageSize: 10,
  search: '',
  status: 'all',
  role: 'all',
  sortBy: 'joinedAt',
  sortDirection: 'desc',
};

const newUserValues: UserFormValues = {
  name: '  新規 ユーザー  ',
  email: '  new.user@example.com  ',
  company: '  Example Inc.  ',
  role: 'admin',
  status: 'active',
  phone: '  03-1111-2222  ',
  location: '  東京  ',
  bio: '  運用改善を担当  ',
};

async function loadService() {
  vi.resetModules();
  vi.doMock('@/lib/wait', () => ({
    wait: () => Promise.resolve(),
  }));

  return import('./mockUserService');
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('mockUserService', () => {
  it('ページング結果を補正し、サマリーを返す', async () => {
    const { listUsers } = await loadService();

    const result = await listUsers({
      ...baseListParams,
      page: 999,
    });

    expect(result.total).toBe(42);
    expect(result.page).toBe(5);
    expect(result.totalPages).toBe(5);
    expect(result.items).toHaveLength(2);
    expect(result.summary).toEqual({
      totalUsers: 42,
      activeUsers: 29,
      invitedUsers: 9,
      suspendedUsers: 4,
    });
  });

  it('並び替え項目ごとに昇順ソートできる', async () => {
    const { listUsers } = await loadService();

    const byName = await listUsers({
      ...baseListParams,
      pageSize: 5,
      sortBy: 'name',
      sortDirection: 'asc',
    });
    const byCompany = await listUsers({
      ...baseListParams,
      pageSize: 5,
      sortBy: 'company',
      sortDirection: 'asc',
    });
    const byLastActive = await listUsers({
      ...baseListParams,
      pageSize: 5,
      sortBy: 'lastActiveAt',
      sortDirection: 'asc',
    });

    expect(byName.items.map((user) => user.name)).toEqual(
      [...byName.items.map((user) => user.name)].sort((left, right) =>
        left.localeCompare(right, 'ja')
      )
    );
    expect(byCompany.items.map((user) => user.company)).toEqual(
      [...byCompany.items.map((user) => user.company)].sort((left, right) =>
        left.localeCompare(right, 'ja')
      )
    );
    expect(byLastActive.items.map((user) => user.lastActiveAt)).toEqual(
      [...byLastActive.items.map((user) => user.lastActiveAt)].sort((left, right) =>
        left.localeCompare(right, 'ja')
      )
    );
  });

  it('ステータスと権限で絞り込みできる', async () => {
    const { listUsers } = await loadService();

    const result = await listUsers({
      ...baseListParams,
      pageSize: 50,
      status: 'active',
      role: 'owner',
    });

    expect(result.total).toBeGreaterThan(0);
    expect(
      result.items.every((user) => user.status === 'active' && user.role === 'owner')
    ).toBe(true);
  });

  it('ユーザー作成時に入力値を正規化し、重複メールを拒否する', async () => {
    const { createUser, listUsers } = await loadService();

    const createdUser = await createUser(newUserValues);

    expect(createdUser).toMatchObject({
      id: 'usr-1043',
      name: '新規 ユーザー',
      email: 'new.user@example.com',
      company: 'Example Inc.',
      role: 'admin',
      status: 'active',
      phone: '03-1111-2222',
      location: '東京',
      bio: '運用改善を担当',
    });

    const result = await listUsers({
      ...baseListParams,
      pageSize: 5,
      search: 'new.user@example.com',
    });

    expect(result.total).toBe(1);
    expect(result.items[0]?.id).toBe('usr-1043');

    await expect(
      createUser({
        ...newUserValues,
        email: 'NEW.USER@example.com',
      })
    ).rejects.toThrow('同じメールアドレスのユーザーが既に登録されています。');
  });

  it('既存ユーザーを更新し、不正な更新対象はエラーにする', async () => {
    const { getUserById, updateUser } = await loadService();

    const currentUser = await getUserById('usr-1001');
    expect(currentUser).not.toBeNull();

    const updatedUser = await updateUser('usr-1001', {
      name: '青木 美咲',
      email: 'misaki.aoki1@example.com',
      company: 'Northwind Global',
      role: 'owner',
      status: 'active',
      phone: '03-9999-8888',
      location: '横浜',
      bio: '監査対応を担当',
    });

    expect(updatedUser).toMatchObject({
      id: 'usr-1001',
      company: 'Northwind Global',
      role: 'owner',
      status: 'active',
      phone: '03-9999-8888',
      location: '横浜',
      bio: '監査対応を担当',
    });
    expect(updatedUser.lastActiveAt).not.toBe(currentUser?.lastActiveAt);

    await expect(
      updateUser('usr-9999', {
        ...newUserValues,
        name: '存在しないユーザー',
      })
    ).rejects.toThrow('指定したユーザーが存在しません。');
  });

  it('ユーザー削除時に対象を削除し、存在しない対象はエラーにする', async () => {
    const { deleteUser, getUserById } = await loadService();

    await deleteUser('usr-1001');

    await expect(getUserById('usr-1001')).resolves.toBeNull();
    await expect(deleteUser('usr-9999')).rejects.toThrow(
      '指定したユーザーが存在しません。'
    );
  });
});
