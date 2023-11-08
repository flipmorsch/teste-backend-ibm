import {inject, injectable} from 'tsyringe'
import {config} from '../../config'
import {Customer} from '../../domain/entities/customer'
import {Http} from '../../infra/http'

@injectable()
export class CustomerService {
  private readonly customer_path = config.customer_path
  constructor(@inject(Http) private readonly http: Http) {}

  async getCustomers() {
    const customers = await this.http.get<Customer[]>(this.customer_path)
    return customers
  }
}
