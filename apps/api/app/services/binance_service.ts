import axios from 'axios'

export default class BinanceService {
  static readonly REQUEST_TIMEOUT = 10000

  async fetchAlphaCoins() {
    const url = 'https://www.binance.com/bapi/defi/v1/public/wallet-direct/buw/wallet/cex/alpha/all/token/list'
    try {
      const res = await axios.get(url, {
        headers: {
          Accept: 'application/json',
        },
        timeout: BinanceService.REQUEST_TIMEOUT,
      })
      return res.data.data
    } catch (err: any) {
      const status = err.response?.status
      const body = err.response?.data
      throw new Error(`fetchAlphaCoins failed$ (${status}): ${JSON.stringify(body)}`)
    }
  }

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.binance.com/api/v3/exchangeInfo')
    const data = await res.json() as any
    if (!data.symbols) {
      throw new Error('Invalid Binance response')
    }
    return data.symbols
      .filter((s: any) => s.status === 'TRADING' && s.isSpotTradingAllowed && s.quoteAsset === 'USDT')
      .map((s: any) => s.baseAsset)
  }

  async fetchFuturesCoins() {
    const res = await fetch('https://api.binance.com/api/v3/exchangeInfo')
    const data = await res.json() as any
    if (!data.symbols) {
      throw new Error('Invalid Binance response')
    }
    return data.symbols
      .filter((s: any) => s.status === 'TRADING' && s.isMarginTradingAllowed && s.quoteAsset === 'USDT')
      .map((s: any) => s.baseAsset)
  }

  async fetchSpotCoinPrices() {
    const res = await fetch('https://api.binance.com/api/v3/ticker/price')
    const data = await res.json() as any
    if (!data) {
      throw new Error('Invalid Binance response')
    }
    const map: Record<string, number> = {}
    data
      .filter((p: any) => p.symbol.endsWith('USDT'))
      .forEach((p: any) => {
        const base = p.symbol.replace(/'|USDT$/g, '')
        map[base] = parseFloat(p.price)
      })
    return map
  }

  async fetchFuturesCoinPrices() {
    const res = await fetch('https://fapi.binance.com/fapi/v1/ticker/price')
    const data = await res.json() as any
    if (!data) {
      throw new Error('Invalid Binance response')
    }
    const map: Record<string, number> = {}
    data
      .filter((p: any) => p.symbol.endsWith('USDT'))
      .forEach((p: any) => {
        const base = p.symbol.replace(/'|USDT$/g, '')
        map[base] = parseFloat(p.price)
      })
    return map
  }

}