export default class CoinbaseService {

  async fetchSpotCoins(): Promise<string[]> {
    const res = await fetch('https://api.exchange.coinbase.com/products')
    const list = await res.json() as any
    if (!list) {
      throw new Error('Invalid Coinbase response')
    }
    return list
      .filter((s: any) => s.status?.toLowerCase() === 'online' && s.quote_currency === 'USD')
      .map((s: any) => s.base_currency)
  }

}