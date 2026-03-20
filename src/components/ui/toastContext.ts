/**
 * @file このファイルはトースト通知の React コンテキストを定義します。
 */

import { createContext } from 'react';
import type { ToastContextValue } from '@/type/toast';

export const ToastContext = createContext<ToastContextValue | null>(null);
