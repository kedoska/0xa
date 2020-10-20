amaris-axa
==========

This project exposes an ExpressJs server that is a proxy to secure, access, and filter any _Policy_ and _Client_ endpoints compatible 
with **mocky.io V2** `580891a4100000e8242b75c5` and `5808862710000087232b75ac`.

## Before you start

The server requires the `.env` file. Use the example file (`.env.example`) to configure your environment.<br/>
:warning: Never push your env file into the repository.<br/>
Contact your manager to get your test endpoints and the rest of the required parameters.

Once you have the project on your machine, please run the following commands to ensure you have all the required dependencies.

 1. run `npm install` to donwload all the node modules
 2. make a copy of the `.env.example` as `.env`
 3. run `npm test`


## A.P.I.

#### GET `/v1/users/`
 - Can be accessed by users with role "`users`" and "`admin`"
 - Can be filtered by name using the querystring `?name=`
 - Returns and array of User
 - If no results are available, `empty array` is returned

```typescript
export interface User {
  id: string
  name: string
  email: string
  role: Role
}
```

#### GET `/v1/users/:id`
 - Can be accessed by users with role "`users`" and "`admin`"
 - Returns the User associated to the give `id`
 - If no results are available, `404` is returned
 - If no ID is provided, `400` is returned

```typescript
interface User {
  id: string
  name: string
  email: string
  role: Role
}
```

#### GET `/v1/users/:id/policies`
 - Can be accessed by users with role "admin" and by the own user
 - Get the list of policies of the given user `id`
 - If no results are available, `404` is returned

```typescript
interface Policy {
  id: string
  amountInsured: number
  email: string
  inceptionDate: string
  installmentPayment: boolean
  clientId: string
}
```