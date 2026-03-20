/**
 * @file このテストは AppShell のナビゲーション表示と Outlet 描画を検証します。
 */

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { AppShell } from './AppShell';

vi.mock('@/lib/environment', () => ({
  getApiEnvironmentLabel: () => 'Mock API',
}));

function renderAppShell(initialPath = '/users') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/users" element={<div>ユーザー一覧ページ</div>} />
          <Route path="/users/:userId" element={<div>ユーザー詳細ページ</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('AppShell', () => {
  it('ナビゲーションと環境ラベル、Outlet の内容を表示する', () => {
    renderAppShell('/users');

    expect(
      screen.getByRole('heading', { name: 'Northwind Admin' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    expect(screen.getByText('Mock API')).toBeInTheDocument();
    expect(screen.getByText('ユーザー一覧ページ')).toBeInTheDocument();
  });

  it('現在のルートに対応するナビゲーションをアクティブ表示する', () => {
    renderAppShell('/users/42');

    const usersLink = screen.getByRole('link', { name: /ユーザー管理/ });

    expect(usersLink).toHaveClass('nav-card--active');
    expect(screen.getByText('ユーザー詳細ページ')).toBeInTheDocument();
  });
});
