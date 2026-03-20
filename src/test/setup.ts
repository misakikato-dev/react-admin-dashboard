/**
 * @file このファイルは Vitest 実行時の DOM テスト環境を初期化します。
 */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
