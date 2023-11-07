import {Http} from '../../infra/http'
import {CustomerOrder} from '../dtos/customer-order'
import {LoyalCustomer} from '../dtos/loyal-customer'
import {CustomerService} from '../services/customer.service'
import {WineService} from '../services/wine.service'
import {CustomerOrderUtils} from '../shared/utils/customer-order.utils'

export class LoyalCustomersUsecase {
  constructor(
    private customerService: CustomerService,
    private wineService: WineService
  ) {}

  async execute(): Promise<any> {
    const [customers, wines] = await Promise.all([
      await this.customerService.getCustomers(),
      await this.wineService.getWines(),
    ])
    const customerOrders = CustomerOrderUtils.associateWinesToCustomers(
      customers,
      wines
    )
    const calculatedCustomersOrders =
      this.calculateTotalCustomersOrders(customerOrders)
    calculatedCustomersOrders.sort((a, b) => b.total - a.total)
    calculatedCustomersOrders.length = 3
    return calculatedCustomersOrders
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
          customer.quantidade_comprada += customerOrder.quantidade_comprada
          customer.total += customerOrder.total
        } else {
          acc.push({
            nome: customerOrder.nome,
            cpf: customerOrder.cpf,
            telefone: customerOrder.telefone,
            tipo_vinho_preferido: customerOrder.tipo_vinho,
            quantidade_comprada: customerOrder.quantidade_comprada,
            total: customerOrder.total,
          })
        }
        return acc
      },
      [] as LoyalCustomer[]
    )

    return customersCalculatedOrders
  }
}
