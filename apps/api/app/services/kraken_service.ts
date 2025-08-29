export default class KrakenService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.kraken.com/0/public/AssetPairs')
    const list = await res.json() as any
    if (!list) {
      throw new Error('Invalid Kraken response')
    }
    return Object.values(list.result)
      .filter((s: any) => s.status === 'online' && s.quote === 'USDT')
      .map((s: any) => s.base)
  }

}