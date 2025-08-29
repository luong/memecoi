export default class MexcService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.mexc.com/api/v3/exchangeInfo')
    const list = await res.json() as any
    if (!list.symbols) {
      throw new Error('Invalid Mexc response')
    }
    return list.symbols
      .filter((s: any) => s.status === '1' && s.isSpotTradingAllowed && s.quoteAsset === 'USDT')
      .map((s: any) => s.baseAsset)
  }

}