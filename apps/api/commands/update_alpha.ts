import BinanceService from '#services/binance_service'
import BitgetService from '#services/bitget_service'
import BithumbService from '#services/bithumb_service'
import BybitService from '#services/bybit_service'
import CoinbaseService from '#services/coinbase_service'
import GateService from '#services/gate_service'
import KrakenService from '#services/kraken_service'
import KucoinService from '#services/kucoin_service'
import MexcService from '#services/mexc_service'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class UpdateAlpha extends BaseCommand {
  static commandName = 'update:alpha'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }
  async run() {
    const bi = new BinanceService()
    const coins = await bi.fetchFuturesCoinPrices()
    console.log(coins)
  }
}