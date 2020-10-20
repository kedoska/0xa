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

export default (endpoint: string): Promise<{ clients: Client[] }> =>
  new Promise(async (resolve, reject) => {
    const response = await fetch(endpoint)
    const json = await response.json()
    resolve(json)
  })
