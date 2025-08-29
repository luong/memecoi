import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { parseJSON } from '#utils/func'

export default class Coin extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare symbol: string

  @column()
  declare slug: string

  @column()
  declare network: string

  @column()
  declare address: string

  @column({
    prepare: (value: string[] | null) => JSON.stringify(value),
    consume: (value: string | null) => parseJSON(value),
  })
  declare tags: string[]

  @column()
  declare price: number

  @column({ columnName: 'percent_change_24h' })
  declare percentChange24h: number | null

  @column({ columnName: 'volume_24h' })
  declare volume24h: number | null

  @column()
  declare marketCap: number | null

  @column.dateTime()
  declare lastUpdated: DateTime
}