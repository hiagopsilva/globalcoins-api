import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenv.config({ path: '.env' })

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres' as 'postgres' | 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + process.env.ENTITIES_PATH],
  migrations: [__dirname + process.env.MIGRATIONS_PATH],
  synchronize: false,
  logging: true,
  cache: false,
  ssl: true,
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
