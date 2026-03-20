/**
 * @file このファイルはローカルデータを使ったユーザー CRUD のモック実装を定義します。
 */

import { Message } from '@/constants/Message'
import type {
  SortDirection,
  User,
  UserFormValues,
  UserListParams,
  UserListResult,
  UserRole,
  UserSummary,
  UserStatus,
} from '@/type/users'
import { wait } from '@/lib/wait'

const userSeeds = [
  { name: '青木 美咲', handle: 'misaki.aoki', company: 'Northwind JP', location: '東京' },
  { name: '佐藤 颯太', handle: 'sota.sato', company: 'Fjord Commerce', location: '大阪' },
  { name: '高橋 菜々', handle: 'nana.takahashi', company: 'Blue Harbor', location: '名古屋' },
  { name: '伊藤 凌', handle: 'ryo.ito', company: 'Craft Grid', location: '福岡' },
  { name: '山本 葵', handle: 'aoi.yamamoto', company: 'Skyline Works', location: '札幌' },
  { name: '鈴木 海斗', handle: 'kaito.suzuki', company: 'Bridge Labs', location: '横浜' },
  { name: '中村 ひかり', handle: 'hikari.nakamura', company: 'Vista One', location: '仙台' },
  { name: '小林 直人', handle: 'naoto.kobayashi', company: 'Orbit Retail', location: '京都' },
  { name: '加藤 結衣', handle: 'yui.kato', company: 'Anchor Point', location: '神戸' },
  { name: '清水 悠真', handle: 'yuma.shimizu', company: 'Pulse Factory', location: '広島' },
  { name: '森 玲奈', handle: 'reina.mori', company: 'Lattice Base', location: '千葉' },
  { name: '池田 晴', handle: 'haru.ikeda', company: 'Wave Support', location: '埼玉' },
] as const

const roles: UserRole[] = ['owner', 'admin', 'manager', 'support', 'viewer']

function getStatus(index: number): UserStatus {
  if (index % 9 === 0) {
    return 'suspended'
  }

  if (index % 4 === 0) {
    return 'invited'
  }

  return 'active'
}

function createMockUsers(): User[] {
  return Array.from({ length: 42 }, (_, index) => {
    const seed = userSeeds[index % userSeeds.length]
    const status = getStatus(index + 1)
    const role = roles[index % roles.length]
    const joinedAt = new Date(2023, index % 12, (index % 27) + 1, 10, 0, 0)
    const lastActiveAt = new Date(2025, (index + 2) % 12, ((index * 2) % 27) + 1, 9, 30, 0)
    const userNumber = index + 1

    return {
      id: `usr-${String(1001 + index)}`,
      name: seed.name,
      email: `${seed.handle}${userNumber}@example.com`,
      company: seed.company,
      role,
      status,
      bio: `${seed.company} の運用を担当するメンバーです。権限とステータスの更新、問い合わせ一次対応、各種データ整備を主に担当しています。`,
      phone: `090-${String(1200 + index).padStart(4, '0')}-${String(3300 + index).padStart(4, '0')}`,
      location: seed.location,
      joinedAt: joinedAt.toISOString(),
      lastActiveAt: lastActiveAt.toISOString(),
    }
  })
}

let usersStore = createMockUsers()

function normalizeUserFormValues(values: UserFormValues): UserFormValues {
  return {
    ...values,
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    phone: values.phone.trim(),
    location: values.location.trim(),
    bio: values.bio.trim(),
  }
}

function buildSummary(users: User[]): UserSummary {
  return users.reduce<UserSummary>(
    (summary, user) => {
      summary.totalUsers += 1

      if (user.status === 'active') {
        summary.activeUsers += 1
      }

      if (user.status === 'invited') {
        summary.invitedUsers += 1
      }

      if (user.status === 'suspended') {
        summary.suspendedUsers += 1
      }

      return summary
    },
    {
      totalUsers: 0,
      activeUsers: 0,
      invitedUsers: 0,
      suspendedUsers: 0,
    }
  )
}

function matchesSearch(user: User, search: string) {
  const keyword = search.trim().toLowerCase()

  if (!keyword) {
    return true
  }

  const searchableText = [
    user.name,
    user.email,
    user.company,
    user.location,
    user.phone,
  ]
    .join(' ')
    .toLowerCase()

  return searchableText.includes(keyword)
}

function matchesFilters(user: User, params: UserListParams) {
  const matchesStatus = params.status === 'all' || user.status === params.status
  const matchesRole = params.role === 'all' || user.role === params.role

  return matchesStatus && matchesRole && matchesSearch(user, params.search)
}

function compareByDirection(
  left: string,
  right: string,
  sortDirection: SortDirection
) {
  const result = left.localeCompare(right, 'ja')
  return sortDirection === 'asc' ? result : result * -1
}

function sortUsers(users: User[], params: UserListParams) {
  const { sortBy, sortDirection } = params

  return [...users].sort((left, right) => {
    switch (sortBy) {
      case 'name':
        return compareByDirection(left.name, right.name, sortDirection)
      case 'company':
        return compareByDirection(left.company, right.company, sortDirection)
      case 'lastActiveAt':
        return compareByDirection(left.lastActiveAt, right.lastActiveAt, sortDirection)
      case 'joinedAt':
      default:
        return compareByDirection(left.joinedAt, right.joinedAt, sortDirection)
    }
  })
}

function getNextUserId() {
  const maxUserId = usersStore.reduce((maxId, user) => {
    const numericId = Number(user.id.replace(/\D/g, ''))
    return Math.max(maxId, numericId)
  }, 1000)

  return `usr-${String(maxUserId + 1)}`
}

function ensureUniqueEmail(email: string, excludedUserId?: string) {
  const existingUser = usersStore.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() && user.id !== excludedUserId
  )

  if (existingUser) {
    throw new Error(Message.users.service.mock.duplicateEmail)
  }
}

export async function listUsers(params: UserListParams): Promise<UserListResult> {
  await wait(320)

  const filteredUsers = usersStore.filter((user) => matchesFilters(user, params))
  const sortedUsers = sortUsers(filteredUsers, params)
  const total = sortedUsers.length
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize))
  const safePage = Math.min(Math.max(params.page, 1), totalPages)
  const startIndex = (safePage - 1) * params.pageSize
  const items = sortedUsers.slice(startIndex, startIndex + params.pageSize)

  return {
    items,
    total,
    page: safePage,
    pageSize: params.pageSize,
    totalPages,
    summary: buildSummary(filteredUsers),
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  await wait(240)
  return usersStore.find((user) => user.id === userId) ?? null
}

export async function createUser(values: UserFormValues): Promise<User> {
  await wait(380)

  const normalized = normalizeUserFormValues(values)
  ensureUniqueEmail(normalized.email)

  const now = new Date().toISOString()
  const nextUser: User = {
    id: getNextUserId(),
    name: normalized.name,
    email: normalized.email,
    company: normalized.company,
    role: normalized.role,
    status: normalized.status,
    bio: normalized.bio,
    phone: normalized.phone,
    location: normalized.location,
    joinedAt: now,
    lastActiveAt: now,
  }

  usersStore = [nextUser, ...usersStore]

  return nextUser
}

export async function updateUser(
  userId: string,
  values: UserFormValues
): Promise<User> {
  await wait(380)

  const currentUser = usersStore.find((user) => user.id === userId)

  if (!currentUser) {
    throw new Error(Message.users.service.mock.userNotFound)
  }

  const normalized = normalizeUserFormValues(values)
  ensureUniqueEmail(normalized.email, userId)

  const nextUser: User = {
    ...currentUser,
    ...normalized,
    lastActiveAt: new Date().toISOString(),
  }

  usersStore = usersStore.map((user) => (user.id === userId ? nextUser : user))

  return nextUser
}

export async function deleteUser(userId: string): Promise<void> {
  await wait(300)

  const exists = usersStore.some((user) => user.id === userId)

  if (!exists) {
    throw new Error(Message.users.service.mock.userNotFound)
  }

  usersStore = usersStore.filter((user) => user.id !== userId)
}
