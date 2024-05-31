import { Entity, Column } from 'typeorm'

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, name: 'last_name' })
  lastName: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @Column({ name: 'deleted_at' })
  deletedAt: Date
}
