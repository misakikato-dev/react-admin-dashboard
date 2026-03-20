/**
 * @file このテストは UserForm の入力連携、エラー表示、送信動作を検証します。
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import type { UseUserFormResult } from '@/type/usersHooks';
import { UserForm } from './UserForm';

function createFormHarness(
  overrides: Partial<UseUserFormResult> = {}
) {
  const setFieldValue = vi.fn();
  const handleBlur = vi.fn();
  const handleSubmit = vi.fn(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  });

  const form: UseUserFormResult = {
    values: {
      name: '青木 美咲',
      email: 'misaki@example.com',
      company: 'Northwind JP',
      role: 'viewer',
      status: 'invited',
      phone: '090-1234-5678',
      location: '東京',
      bio: '運用担当',
    },
    errors: {},
    isSubmitting: false,
    setFieldValue: setFieldValue as unknown as UseUserFormResult['setFieldValue'],
    handleBlur: handleBlur as UseUserFormResult['handleBlur'],
    handleSubmit: handleSubmit as UseUserFormResult['handleSubmit'],
    ...overrides,
  };

  return {
    form,
    setFieldValue,
    handleBlur,
    handleSubmit,
  };
}

function renderUserForm(form: UseUserFormResult) {
  return render(
    <MemoryRouter>
      <UserForm cancelTo="/users" form={form} />
    </MemoryRouter>
  );
}

describe('UserForm', () => {
  it('全入力項目の変更と blur をフォームハンドラーに中継する', () => {
    const { form, setFieldValue, handleBlur } = createFormHarness();

    renderUserForm(form);

    const nameInput = screen.getByRole('textbox', { name: /氏名/ });
    fireEvent.change(nameInput, { target: { value: '佐藤 次郎' } });
    fireEvent.blur(nameInput);

    const emailInput = screen.getByRole('textbox', {
      name: /メールアドレス/,
    });
    fireEvent.change(emailInput, { target: { value: 'sato@example.com' } });
    fireEvent.blur(emailInput);

    const companyInput = screen.getByRole('textbox', { name: /会社名/ });
    fireEvent.change(companyInput, { target: { value: 'Fjord Commerce' } });
    fireEvent.blur(companyInput);

    const roleSelect = screen.getByRole('combobox', { name: /権限/ });
    fireEvent.change(roleSelect, { target: { value: 'admin' } });
    fireEvent.blur(roleSelect);

    const statusSelect = screen.getByRole('combobox', { name: /ステータス/ });
    fireEvent.change(statusSelect, { target: { value: 'active' } });
    fireEvent.blur(statusSelect);

    const phoneInput = screen.getByRole('textbox', { name: /電話番号/ });
    fireEvent.change(phoneInput, { target: { value: '03-1111-2222' } });
    fireEvent.blur(phoneInput);

    const locationInput = screen.getByRole('textbox', { name: /所在地/ });
    fireEvent.change(locationInput, { target: { value: '大阪' } });
    fireEvent.blur(locationInput);

    const bioInput = screen.getByRole('textbox', { name: /プロフィール/ });
    fireEvent.change(bioInput, { target: { value: '権限管理を担当' } });
    fireEvent.blur(bioInput);

    expect(setFieldValue).toHaveBeenCalledWith('name', '佐藤 次郎');
    expect(setFieldValue).toHaveBeenCalledWith('email', 'sato@example.com');
    expect(setFieldValue).toHaveBeenCalledWith('company', 'Fjord Commerce');
    expect(setFieldValue).toHaveBeenCalledWith('role', 'admin');
    expect(setFieldValue).toHaveBeenCalledWith('status', 'active');
    expect(setFieldValue).toHaveBeenCalledWith('phone', '03-1111-2222');
    expect(setFieldValue).toHaveBeenCalledWith('location', '大阪');
    expect(setFieldValue).toHaveBeenCalledWith('bio', '権限管理を担当');
    expect(handleBlur).toHaveBeenCalledWith('name');
    expect(handleBlur).toHaveBeenCalledWith('email');
    expect(handleBlur).toHaveBeenCalledWith('company');
    expect(handleBlur).toHaveBeenCalledWith('role');
    expect(handleBlur).toHaveBeenCalledWith('status');
    expect(handleBlur).toHaveBeenCalledWith('phone');
    expect(handleBlur).toHaveBeenCalledWith('location');
    expect(handleBlur).toHaveBeenCalledWith('bio');
  });

  it('エラー表示と送信中表示を切り替える', () => {
    const { form } = createFormHarness({
      errors: {
        email: 'メールアドレスの形式が不正です。',
      },
      isSubmitting: true,
    });

    renderUserForm(form);

    expect(
      screen.getByText('メールアドレスの形式が不正です。')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '保存中...' })
    ).toBeDisabled();
    expect(screen.getByRole('link', { name: 'キャンセル' })).toHaveAttribute(
      'href',
      '/users'
    );
  });

  it('送信ボタンから handleSubmit を呼び出す', () => {
    const { form, handleSubmit } = createFormHarness();

    renderUserForm(form);

    fireEvent.click(screen.getByRole('button', { name: '保存する' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
