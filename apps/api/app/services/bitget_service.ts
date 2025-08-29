export default class BitgetService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.bitget.com/api/v2/spot/public/symbols')
    const list = await res.json() as any
    if (!list.data) {
      throw new Error('Invalid Bitget response')
    }
    return list.data
      .filter((s: any) => s.quoteCoin === 'USDT' && s.status === 'online')
      .map((s: any) => s.baseCoin)
  }

}