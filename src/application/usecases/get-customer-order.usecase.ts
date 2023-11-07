import {Customer} from '../../domain/entities/customer'
import {Wine} from '../../domain/entities/wine'
import {Http} from '../../infra/http'
import {CustomerOrder} from '../dtos/customer-order'
import {CustomerService} from '../services/customer.service'
import {WineService} from '../services/wine.service'

export class OrderUseCase {
  constructor(
    private customerService: CustomerService,
    private wineService: WineService
  ) {}
  async getOrders() {
    const [customers, wines] = await Promise.all([
      await this.customerService.getCustomers(),
      await this.wineService.getWines(),
    ])
    const customerOrders = this.associateWinesToCustomers(customers, wines)

    return customerOrders.sort((a, b) => a.total - b.total)
  }

  private associateWinesToCustomers(
    customers: Customer[],
    wines: Wine[]
  ): CustomerOrder[] {
    const customerOrders: CustomerOrder[] = []

    customers.forEach(customer => {
      const customerWine = wines.filter(
        wine => wine.tipo_vinho === customer.tipo_vinho_preferido
      )
      customerWine.forEach(wine => {
        customerOrders.push({
          nome: customer.nome,
          cpf: customer.cpf,
          telefone: customer.telefone,
          tipo_vinho: customer.tipo_vinho_preferido,
          preco: wine.preco,
          quantidade_comprada: customer.quantidade_comprada,
          safra: wine.safra,
          ano_compra: wine.ano_compra,
          total: wine.preco * customer.quantidade_comprada,
        })
      })
    })

    return customerOrders
  }
}