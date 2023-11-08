import {inject, injectable} from 'tsyringe'
import {CustomerOrder} from '../dtos/customer-order'
import {CustomerService} from '../services/customer.service'
import {WineService} from '../services/wine.service'
import {CustomerOrderUtils} from '../shared/utils/customer-order.utils'

@injectable()
export class WineRecomendationUseCase {
  constructor(
    @inject(CustomerService) private customerService: CustomerService,
    @inject(WineService) private wineService: WineService
  ) {}

  async execute(nome: string): Promise<string> {
    const [customers, wines] = await Promise.all([
      await this.customerService.getCustomers(),
      await this.wineService.getWines(),
    ])
    const customersOrders = CustomerOrderUtils.mapOrders(customers, wines)
    const customer = customersOrders.filter(customer => customer.nome === nome)
    const customerMostBoughtWine = this.getMostBoughtWine(customer)

    return this.getWineRecomendation(customersOrders, customerMostBoughtWine)
  }

  private getWineRecomendation(
    customerOrders: CustomerOrder[],
    mostBoughtWine: string
  ): string {
    const wines = customerOrders
      .filter(
        customerOrder => customerOrder.compras_vinho.tipo !== mostBoughtWine
      )
      .map(customerOrder => customerOrder.compras_vinho.tipo)
    const wineRecomendations = [...new Set(wines)]
    return wineRecomendations[
      Math.floor(Math.random() * wineRecomendations.length)
    ]
  }

  private getMostBoughtWine(customerOrders: CustomerOrder[]): string {
    let mostBoughtWine = customerOrders[0].compras_vinho
    customerOrders.forEach(order => {
      if (order.compras_vinho.quantidade > mostBoughtWine.quantidade) {
        mostBoughtWine = order.compras_vinho
      }
    })
    return mostBoughtWine.tipo
  }
}
