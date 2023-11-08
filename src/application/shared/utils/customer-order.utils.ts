import {Customer} from '../../../domain/entities/customer'
import {Wine} from '../../../domain/entities/wine'
import {CustomerOrder} from '../../dtos/customer-order'

export class CustomerOrderUtils {
  static mapOrders(customers: Customer[], wines: Wine[]): CustomerOrder[] {
    const customerOrders: CustomerOrder[] = []

    customers.forEach(customer => {
      customer.compras_vinho.forEach(order => {
        wines
          .filter(wine => wine.tipo_vinho === order.tipo)
          .forEach(selectedWine => {
            customerOrders.push({
              nome: customer.nome,
              cpf: customer.cpf,
              telefone: customer.telefone,
              compras_vinho: {
                tipo: selectedWine.tipo_vinho,
                quantidade: order.quantidade,
                safra: selectedWine.safra,
                preco: selectedWine.preco,
                ano_compra: selectedWine.ano_compra,
                total: order.quantidade * selectedWine.preco,
              },
            })
          })
      })
    })

    return customerOrders
  }
}
