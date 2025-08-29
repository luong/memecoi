export default class UpbitService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.upbit.com/v1/market/all')
    const list = await res.json() as any
    if (!list) {
      throw new Error('Invalid Upbit response')
    }
    return list
      .filter((s: any) => s.market.startsWith('KRW-'))
      .map((s: any) => s.market.replace('KRW-', ''))
  }

}