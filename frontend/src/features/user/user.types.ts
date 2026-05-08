export type Avatar = {
  url: string
  id: string
}

export type AuthUser = {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
  lastLoginAt: string
  lockUntil: string | null
  createdAt: string
  updatedAt: string
  __v: number
  avatar: Avatar
  permissions: string[]
}
