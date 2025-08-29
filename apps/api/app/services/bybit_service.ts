export default class BybitService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.bybit.com/v5/market/instruments-info?category=spot')
    const list = await res.json() as any
    if (!list.result.list) {
      throw new Error('Invalid Upbit response')
    }
    return list.result.list
      .filter((s: any) => s.status === 'Trading')
      .map((s: any) => s.baseCoin)
  }

}