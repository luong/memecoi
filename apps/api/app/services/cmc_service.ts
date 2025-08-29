import axios from 'axios'
import env from '#start/env'

export default class CmcService {
  static readonly REQUEST_TIMEOUT = 10000
  static readonly MEME_CATEGORY_ID = '6051a82566fc1b42617d6dc6'

  async fetchCategories() {
    const res = await this.doGet('v1/cryptocurrency/categories')
    return res.data
  }

  async fetchCoinsInCategory(opts: { categoryId: string; start: number; limit: number }) {
    const res = await this.doGet(`v1/cryptocurrency/category?id=${opts.categoryId}&start=${opts.start}&limit=${opts.limit}`)
    return res.data
  }

  async doGet(path: string) {
    try {
      const res = await axios.get(`${env.get('MC_API_ENDPOINT')}/${path}`, {
        headers: {
          Accept: 'application/json',
          'X-CMC_PRO_API_KEY': env.get('MC_API_KEY'),
        },
        timeout: CmcService.REQUEST_TIMEOUT,
      })
      return res.data
    } catch (err: any) {
      const status = err.response?.status
      const body = err.response?.data
      throw new Error(`fetchMemes failed$ (${status}): ${JSON.stringify(body)}`)
    }
  }
}