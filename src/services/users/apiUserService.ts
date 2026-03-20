/**
 * @file このファイルは REST API 経由でユーザー CRUD を行うサービスを定義します。
 */

import { Message } from '@/constants/Message'
import {
  getApiEnvironmentLabel,
  getRequiredApiBaseUrl,
} from '@/lib/environment'
import type { RequestOptions, QueryValue } from '@/type/service'
import type { User, UserFormValues, UserListParams, UserListResult } from '@/type/users'

function buildRequestUrl(
  path: string,
  query: Record<string, QueryValue> = {}
) {
  const baseUrl = getRequiredApiBaseUrl()
  const normalizedBaseUrl = baseUrl === '/' ? '' : baseUrl
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const searchParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      return
    }

    searchParams.set(key, String(value))
  })

  const search = searchParams.toString()
  return search
    ? `${normalizedBaseUrl}${normalizedPath}?${search}`
    : `${normalizedBaseUrl}${normalizedPath}`
}

async function readResponseBody(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text ? text : null
}

function getFallbackErrorMessage(status: number) {
  switch (status) {
    case 400:
      return Message.users.service.api.badRequest
    case 401:
      return Message.users.service.api.unauthorized
    case 403:
      return Message.users.service.api.forbidden
    case 404:
      return Message.users.service.api.notFound
    case 409:
      return Message.users.service.api.conflict
    case 422:
      return Message.users.service.api.unprocessableEntity
    default:
      return Message.users.service.api.requestFailed(status)
  }
}

function getErrorMessage(body: unknown, status: number) {
  if (body && typeof body === 'object') {
    if ('message' in body && typeof body.message === 'string') {
      return body.message
    }

    if ('error' in body && typeof body.error === 'string') {
      return body.error
    }
  }

  if (typeof body === 'string' && body.trim()) {
    return body
  }

  return getFallbackErrorMessage(status)
}

async function request<T>(
  path: string,
  { body, method = 'GET', query, returnNullOnNotFound = false }: RequestOptions = {}
): Promise<T> {
  let response: Response

  try {
    response = await fetch(buildRequestUrl(path, query), {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error(Message.users.service.api.connectionFailed(getApiEnvironmentLabel()))
  }

  if (returnNullOnNotFound && response.status === 404) {
    return null as T
  }

  if (!response.ok) {
    const errorBody = await readResponseBody(response)
    throw new Error(getErrorMessage(errorBody, response.status))
  }

  if (response.status === 204) {
    return undefined as T
  }

  return readResponseBody(response) as Promise<T>
}

export function listUsers(params: UserListParams): Promise<UserListResult> {
  return request<UserListResult>('/users', {
    query: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.search.trim() || undefined,
      status: params.status === 'all' ? undefined : params.status,
      role: params.role === 'all' ? undefined : params.role,
      sortBy: params.sortBy,
      sortDirection: params.sortDirection,
    },
  })
}

export function getUserById(userId: string): Promise<User | null> {
  return request<User | null>(`/users/${userId}`, {
    returnNullOnNotFound: true,
  })
}

export function createUser(values: UserFormValues): Promise<User> {
  return request<User>('/users', {
    method: 'POST',
    body: values,
  })
}

export function updateUser(
  userId: string,
  values: UserFormValues
): Promise<User> {
  return request<User>(`/users/${userId}`, {
    method: 'PUT',
    body: values,
  })
}

export function deleteUser(userId: string): Promise<void> {
  return request<void>(`/users/${userId}`, {
    method: 'DELETE',
  })
}
