export type Order = {
  tipo: OrderType
  quantidade: number
}

export enum OrderType {
  TINTO = 'Tinto',
  BRANCO = 'Branco',
  ROSE = 'Rosé',
  ESPUMANTE = 'Espumante',
  CHARDONNAY = 'Chardonnay'
}