import { Customer } from "../../../domain/entities/customer"
import { Wine } from "../../../domain/entities/wine"
import { CustomerOrder } from "../../dtos/customer-order"

export class CustomerOrderUtils {
  static associateWinesToCustomers(
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