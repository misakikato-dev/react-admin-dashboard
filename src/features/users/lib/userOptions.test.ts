/**
 * @file このテストはユーザー選択肢、ラベル、補助関数を検証します。
 */

import { describe, expect, it } from 'vitest';
import {
  EMPTY_USER_FORM_VALUES,
  SORT_DIRECTION_OPTIONS,
  USER_ROLE_LABELS,
  USER_ROLE_OPTIONS,
  USER_SORT_FIELD_OPTIONS,
  USER_STATUS_LABELS,
  USER_STATUS_OPTIONS,
  USER_STATUS_TONE_CLASS,
  toUserFormValues,
} from './userOptions';

describe('userOptions', () => {
  it('選択肢とラベル定義を返す', () => {
    expect(USER_ROLE_OPTIONS.map((option) => option.value)).toEqual([
      'owner',
      'admin',
      'manager',
      'support',
      'viewer',
    ]);
    expect(USER_STATUS_OPTIONS.map((option) => option.value)).toEqual([
      'active',
      'invited',
      'suspended',
    ]);
    expect(USER_SORT_FIELD_OPTIONS.map((option) => option.value)).toEqual([
      'joinedAt',
      'lastActiveAt',
      'name',
      'company',
    ]);
    expect(SORT_DIRECTION_OPTIONS.map((option) => option.value)).toEqual([
      'desc',
      'asc',
    ]);

    expect(EMPTY_USER_FORM_VALUES).toEqual({
      name: '',
      email: '',
      company: '',
      role: 'viewer',
      status: 'invited',
      phone: '',
      location: '',
      bio: '',
    });

    expect(USER_ROLE_LABELS.owner).toBe('オーナー');
    expect(USER_STATUS_LABELS.suspended).toBe('停止中');
    expect(USER_STATUS_TONE_CLASS.active).toBe('badge--success');
  });

  it('User からフォーム値へ変換する', () => {
    expect(
      toUserFormValues({
        id: 'usr-2001',
        name: '青木 美咲',
        email: 'misaki@example.com',
        company: 'Northwind JP',
        role: 'admin',
        status: 'active',
        bio: '運用担当',
        phone: '090-1234-5678',
        location: '東京',
        joinedAt: '2024-01-01T00:00:00.000Z',
        lastActiveAt: '2024-01-02T00:00:00.000Z',
      })
    ).toEqual({
      name: '青木 美咲',
      email: 'misaki@example.com',
      company: 'Northwind JP',
      role: 'admin',
      status: 'active',
      phone: '090-1234-5678',
      location: '東京',
      bio: '運用担当',
    });
  });
});
