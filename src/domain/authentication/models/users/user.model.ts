export type UserModel = {
  id: string
  name: string
  last_name: string
  phone: string
  email: string
  password: string
  created_at: Date
  role: 'admin' | 'client'
}
