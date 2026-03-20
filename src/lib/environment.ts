/**
 * @file このファイルは API 接続先の環境判定とベース URL 解決を担います。
 */

import type { ApiEnvironment } from '@/type/environment';

const apiEnvironmentLabels: Record<ApiEnvironment, string> = {
  mock: 'Mock API',
  staging: 'Staging API',
  production: 'Production API',
};

const defaultApiEnvironment: ApiEnvironment = 'mock';

function isApiEnvironment(value: string): value is ApiEnvironment {
  return value in apiEnvironmentLabels;
}

export function getApiEnvironment(
  rawEnvironment = import.meta.env.VITE_API_ENVIRONMENT
): ApiEnvironment {
  const normalizedEnvironment = rawEnvironment?.trim().toLowerCase();

  if (normalizedEnvironment && isApiEnvironment(normalizedEnvironment)) {
    return normalizedEnvironment;
  }

  return defaultApiEnvironment;
}

export function getApiEnvironmentLabel(
  environment = getApiEnvironment()
): string {
  return apiEnvironmentLabels[environment]
}

export function getApiBaseUrl(
  rawBaseUrl = import.meta.env.VITE_API_BASE_URL
): string | null {
  const normalizedBaseUrl = rawBaseUrl?.trim()

  if (!normalizedBaseUrl) {
    return null
  }

  return normalizedBaseUrl.replace(/\/+$/, '') || '/'
}

export function getRequiredApiBaseUrl(
  rawBaseUrl = import.meta.env.VITE_API_BASE_URL
): string {
  const baseUrl = getApiBaseUrl(rawBaseUrl)

  if (baseUrl) {
    return baseUrl
  }

  throw new Error(
    `${getApiEnvironmentLabel()} を使用するには VITE_API_BASE_URL を設定してください。`
  )
}
