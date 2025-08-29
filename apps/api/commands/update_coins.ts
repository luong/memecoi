import Coin from '#models/coin'
import McService from '#services/mc_service'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

export default class UpdateCoins extends BaseCommand {
  static commandName = 'update:coins'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  async run() {
    const mc = new McService()
    let start = 1
    let limit = 1000
    let max = 0
    do {
      const data = await mc.fetchCoinsInCategory({ categoryId: McService.MEME_CATEGORY_ID, start: start, limit: limit })
      max = data.num_tokens
      for (const coin of data.coins) {
        await Coin.updateOrCreate(
          { code: coin.id as string },
          { 
            name: coin.name,
            symbol: coin.symbol,
            slug: coin.slug,
            network: coin.platform?.slug,
            address: coin.platform?.token_address,
            tags: coin.tags,
            price: coin.quote.USD.price,
            percentChange24h: !coin.quote.USD.price ? 0 : coin.quote.USD.percent_change_24h?.toFixed(2),
            volume24h: coin.quote.USD.volume_24h,
            marketCap: coin.quote.USD.market_cap,
            lastUpdated: DateTime.fromISO(coin.last_updated) 
          },
        )
      }
      start += limit
    } while (start <= max)
  }
}