import 'reflect-metadata'
import {container} from 'tsyringe'
import {GetCustomerOrderUseCase} from '../get-customer-order.usecase'
import {CustomerOrderUtils} from '../../shared/utils/customer-order.utils'

jest.mock('../../../infra/http')
describe('GetCustomerOrderUseCase Unit Tests', () => {
  let getCustomerOrderUseCase: GetCustomerOrderUseCase
  beforeEach(() => {
    getCustomerOrderUseCase = container.resolve(GetCustomerOrderUseCase)
    jest.clearAllMocks()
  })

  it('should return customers orders ascending by price', async () => {
    jest.spyOn(CustomerOrderUtils, 'mapOrders').mockReturnValue([
      {
        nome: 'Maria Santos',
        cpf: '987.654.321-09',
        telefone: '(21) 9876-5432',
        compras_vinho: {
          tipo: 'Tinto',
          quantidade: 8,
          safra: '2017',
          preco: 29.99,
          ano_compra: 2018,
          total: 239.92,
        },
      },
      {
        nome: 'Camila Carvalho',
        cpf: '890.234.567-01',
        telefone: '(01) 8902-3456',
        compras_vinho: {
          tipo: 'Rosé',
          quantidade: 1,
          safra: '2018',
          preco: 20.99,
          ano_compra: 2019,
          total: 20.99,
        },
      },
      {
        nome: 'Jorge Santos',
        cpf: '789.234.567-01',
        telefone: '(71) 7892-3456',
        compras_vinho: {
          tipo: 'Branco',
          quantidade: 3,
          safra: '2018',
          preco: 26.5,
          ano_compra: 2019,
          total: 79.5,
        },
      },
      {
        nome: 'Lucas Ferreira',
        cpf: '234.567.890-12',
        telefone: '(51) 2345-6789',
        compras_vinho: {
          tipo: 'Branco',
          quantidade: 3,
          safra: '2017',
          preco: 25.25,
          ano_compra: 2018,
          total: 75.75,
        },
      },
    ])

    const result = await getCustomerOrderUseCase.execute()
    expect(result.length).toBe(4)

    const orderTotalArrange = [20.99, 75.75, 79.5, 239.92]
    for (let item of result) {
      expect(item.compras_vinho.total).toBe(orderTotalArrange.shift())
    }
  })
})
