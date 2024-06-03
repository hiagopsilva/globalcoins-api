declare namespace ApiType {
  type RequestModule =
    typeof import('../../../node_modules/@types/node/globals.d.ts')

  type Request = RequestModule & {
    user: {
      sub: number
      id: number
      email: string
      iat: number
      exp: number
    }
  }
}
