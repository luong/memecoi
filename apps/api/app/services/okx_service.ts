export default class OkxService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://www.okx.com/api/v5/public/instruments?instType=SPOT')
    const list = await res.json() as any
    if (!list.data) {
      throw new Error('Invalid Okx response')
    }
    return list.data
      .filter((s: any) => s.quoteCcy === 'USDT' && s.state === 'live')
      .map((s: any) => s.baseCcy)
  }

}