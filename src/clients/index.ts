export interface Client {
  id: string
  name: string
  email: string
  role: Role
}

export enum Role {
  Admin = 'admin',
  User = 'user',
}
