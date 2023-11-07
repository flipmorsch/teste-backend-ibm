import {config} from '../config'

export class Http {
  private readonly url = config.base_url

  async get<T>(path: string): Promise<T> {
    const response = await fetch(this.url + path)
    const data: T = (await response.json()) as T
    return data
  }
}
