/**
 * @file このファイルはサイドバーとコンテンツ領域を持つ共通レイアウトを定義します。
 */

import { NavLink, Outlet } from 'react-router-dom';
import { Message } from '@/constants/Message';
import { cx } from '@/lib/cx';
import { getApiEnvironmentLabel } from '@/lib/environment';

const navigationItems = [
  {
    to: '/users',
    label: Message.app.shell.navigation.users.label,
    description: Message.app.shell.navigation.users.description,
  },
];

export function AppShell() {
  const apiEnvironmentLabel = getApiEnvironmentLabel();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand__mark">NW</div>
          <div>
            <p className="brand__eyebrow">{Message.app.shell.brand.eyebrow}</p>
            <h1>{Message.app.shell.brand.title}</h1>
          </div>
        </div>

        <nav
          className="sidebar__nav"
          aria-label={Message.app.shell.navigation.ariaLabel}
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                cx('nav-card', isActive && 'nav-card--active')
              }
              to={item.to}
            >
              <span className="nav-card__label">{item.label}</span>
              <span className="nav-card__description">{item.description}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__panel">
          <p className="sidebar__panel-title">{Message.app.shell.operationsMemo.title}</p>
          <p>
            {Message.app.shell.operationsMemo.environmentPrefix}
            <code>{Message.app.shell.operationsMemo.environmentVariable}</code>
            {Message.app.shell.operationsMemo.environmentSuffix}
            <br />
            {Message.app.shell.operationsMemo.line2}
            <br />
            <br />
            {Message.app.shell.operationsMemo.line3}
            <br />
            {Message.app.shell.operationsMemo.line4}
            <br />
            {Message.app.shell.operationsMemo.line5}
          </p>
        </div>
      </aside>

      <div className="app-shell__content">
        <header className="topbar">
          <div>
            <p className="topbar__eyebrow">{Message.app.shell.topbar.eyebrow}</p>
            <p className="topbar__title">{Message.app.shell.topbar.title}</p>
          </div>
          <div className="topbar__meta">
            <span className="topbar__meta-label">
              {Message.app.shell.topbar.environmentLabel}
            </span>
            <strong>{apiEnvironmentLabel}</strong>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
