import {config} from '../../config'
import {Wine} from '../../domain/entities/wine'
import {Http} from '../../infra/http'

export class WineService {
  private readonly wine_path = config.wine_path
  constructor(private readonly http: Http) {}

  async getWines() {
    const wines = await this.http.get<Wine[]>(this.wine_path)
    return wines
  }
}
