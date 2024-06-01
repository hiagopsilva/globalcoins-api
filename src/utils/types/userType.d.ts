declare namespace UserType {
  export type payload = {
    name: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }

  export type item = Omit<payload, 'confirmPassword'> & {
    id: number
  }

  export type updatePayload = Omit<item, 'password'>

  export type changePasswordPayload = Pick<item, 'id' | 'password'> & {
    newPassword: string
  }
}
