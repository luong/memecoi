export default class GateService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.gateio.ws/api/v4/spot/currency_pairs')
    const list = await res.json() as any
    if (!list) {
      throw new Error('Invalid Gate response')
    }
    return list
      .filter((s: any) => s.trade_status === 'tradable' && s.quote === 'USDT')
      .map((s: any) => s.base)
  }

}