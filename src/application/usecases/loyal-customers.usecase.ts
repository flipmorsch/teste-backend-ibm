import { injectable } from 'tsyringe'
import {CustomerOrder} from '../dtos/customer-order'
import {LoyalCustomer} from '../dtos/loyal-customer'
import {CustomerService} from '../services/customer.service'
import {WineService} from '../services/wine.service'
import {CustomerOrderUtils} from '../shared/utils/customer-order.utils'

@injectable()
export class LoyalCustomersUsecase {
  constructor(
    private customerService: CustomerService,
    private wineService: WineService
  ) {}

  async execute(): Promise<LoyalCustomer[]> {
    const [customers, wines] = await Promise.all([
      await this.customerService.getCustomers(),
      await this.wineService.getWines(),
    ])
    const customerOrders = CustomerOrderUtils.mapOrders(customers, wines)
    const loyalCustomers = this.calculateTotalCustomersOrders(customerOrders)
    loyalCustomers.sort((a, b) => b.total - a.total)
    loyalCustomers.length = 3
    return loyalCustomers
  }

  private calculateTotalCustomersOrders(
    customerOrders: CustomerOrder[]
  ): LoyalCustomer[] {
    const customersCalculatedOrders = customerOrders.reduce(
      (acc, customerOrder) => {
        const customer = acc.find(
          customer => customer.cpf === customerOrder.cpf
        )
        if (customer) {
          customer.quantidade_comprada += customerOrder.compras_vinho.quantidade
          customer.total += customerOrder.compras_vinho.total
        } else {
          acc.push({
            nome: customerOrder.nome,
            cpf: customerOrder.cpf,
            telefone: customerOrder.telefone,
            quantidade_comprada: customerOrder.compras_vinho.quantidade,
            total: customerOrder.compras_vinho.total,
          })
        }
        return acc
      },
      [] as LoyalCustomer[]
    )

    return customersCalculatedOrders
  }
}
