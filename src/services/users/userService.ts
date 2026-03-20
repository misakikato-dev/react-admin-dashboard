/**
 * @file このファイルは環境設定に応じて API 実装とモック実装を切り替える窓口を定義します。
 */

import { getApiEnvironment } from '@/lib/environment'
import * as apiUserService from '@/services/users/apiUserService'
import * as mockUserService from '@/services/users/mockUserService'
import type { User, UserFormValues, UserListParams, UserListResult } from '@/type/users'

const activeUserService =
  getApiEnvironment() === 'mock' ? mockUserService : apiUserService

export function listUsers(params: UserListParams): Promise<UserListResult> {
  return activeUserService.listUsers(params)
}

export function getUserById(userId: string): Promise<User | null> {
  return activeUserService.getUserById(userId)
}

export function createUser(values: UserFormValues): Promise<User> {
  return activeUserService.createUser(values)
}

export function updateUser(
  userId: string,
  values: UserFormValues
): Promise<User> {
  return activeUserService.updateUser(userId, values)
}

export function deleteUser(userId: string): Promise<void> {
  return activeUserService.deleteUser(userId)
}
