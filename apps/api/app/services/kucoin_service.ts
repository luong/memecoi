export default class KucoinService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.kucoin.com/api/v2/symbols')
    const list = await res.json() as any
    if (!list.data) {
      throw new Error('Invalid Kucoin response')
    }
    return list.data
      .filter((s: any) => s.quoteCurrency === 'USDT')
      .map((s: any) => s.baseCurrency)
  }

}