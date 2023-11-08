export type CustomerOrder = {
  nome: string
  cpf: string
  telefone: string
  compras_vinho: {
    tipo: string
    quantidade: number
    safra: string
    preco: number
    ano_compra: number
    total: number
  }
}
