import {CustomerOrder} from '../dtos/customer-order'
import {CustomerService} from '../services/customer.service'
import {WineService} from '../services/wine.service'
import {CustomerOrderUtils} from '../shared/utils/customer-order.utils'

export class HighestOrderUseCase {
  constructor(
    private customerService: CustomerService,
    private wineService: WineService
  ) {}

  async execute(ano_compra: number): Promise<CustomerOrder> {
    const [customers, wines] = await Promise.all([
      await this.customerService.getCustomers(),
      await this.wineService.getWines(),
    ])
    const customerOrdersByYear = CustomerOrderUtils.mapOrders(
      customers,
      wines
    ).filter(
      customerOrder => customerOrder.compras_vinho.ano_compra === ano_compra
    )

    return this.getHighestOrderByYear(customerOrdersByYear)
  }

  private getHighestOrderByYear(
    customerOrders: CustomerOrder[]
  ): CustomerOrder {
    let highestOrder = customerOrders[0]
    customerOrders.forEach(customerOrder => {
      if (
        customerOrder.compras_vinho.total > highestOrder.compras_vinho.total
      ) {
        highestOrder = customerOrder
      }
    })
    return highestOrder
  }
}
