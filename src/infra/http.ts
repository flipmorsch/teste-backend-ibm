export class Http {
  constructor(private readonly url: string) {}

  async get<T>(path: string): Promise<T> {
    const response = await fetch(this.url + path)
    const data: T = await response.json()
    return data
  }
}
