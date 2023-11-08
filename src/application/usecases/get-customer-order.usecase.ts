import {injectable} from 'tsyringe'
import {Http} from '../../infra/http'
import {CustomerOrder} from '../dtos/customer-order'
import {CustomerService} from '../services/customer.service'
import {WineService} from '../services/wine.service'
import {CustomerOrderUtils} from '../shared/utils/customer-order.utils'

@injectable()
export class GetCustomerOrderUseCase {
  constructor(
    private customerService: CustomerService,
    private wineService: WineService
  ) {}

  async execute(): Promise<CustomerOrder[]> {
    const [customers, wines] = await Promise.all([
      await this.customerService.getCustomers(),
      await this.wineService.getWines(),
    ])
    const customerOrders = CustomerOrderUtils.mapOrders(customers, wines)

    return customerOrders.sort(
      (a, b) => a.compras_vinho.total - b.compras_vinho.total
    )
  }
}
