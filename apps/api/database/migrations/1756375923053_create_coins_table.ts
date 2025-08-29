import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'coins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('code', 20).unique()
      table.string('name', 200)
      table.string('symbol', 50).index()
      table.string('slug', 200)
      table.string('network', 200).nullable()
      table.string('address', 200).nullable()
      table.json('tags').nullable()
      table.double('price')
      table.double('percent_change_24h')
      table.bigInteger('volume_24h')
      table.bigInteger('market_cap')
      table.dateTime('last_updated')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}