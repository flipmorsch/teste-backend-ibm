import {Order} from './order'

export type Customer = {
  nome: string
  cpf: string
  telefone: string
  compras_vinho: Order[]
}
