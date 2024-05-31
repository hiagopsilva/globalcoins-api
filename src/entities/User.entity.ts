import { Entity, Column } from 'typeorm'

@Entity()
export class Users {
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

  @Column({ name: 'created_at', default: new Date() })
  createdAt: Date

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date
}
