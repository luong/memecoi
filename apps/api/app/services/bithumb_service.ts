export default class BithumbService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.bithumb.com/public/ticker/ALL_KRW')
    const list = await res.json() as any
    if (!list.data) {
      throw new Error('Invalid Upbit response')
    }
    return Object.keys(list.data)
  }

}