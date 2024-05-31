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
}
