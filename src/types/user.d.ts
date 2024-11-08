type User = {
    id?: string
    name: string
    email: string
    role: string
}

type CreateUser = {
  name: string
  email: string
  role: string
  password: string
}

type UpdateUser = {
  id: string
  body: Record<string, string>
}

export {
  User,
  UpdateUser,
  CreateUser
}