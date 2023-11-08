import 'reflect-metadata'
import express from 'express'
import {container} from 'tsyringe'
import {DefaultController} from './controller'

function main() {
  const app = express()
  const controller = container.resolve(DefaultController)

  app.get('/compras', (req, res) => controller.getOrders(req, res))
  app.get('/maior-compra/:ano_compra', (req, res) =>
    controller.getHighestOrder(req, res)
  )
  app.get('/clientes-fieis', (req, res) =>
    controller.getLoyalCustomers(req, res)
  )
  app.get('/recomendacao/:nome/tipo', (req, res) =>
    controller.getWineRecomendation(req, res)
  )

  app.listen(3000, () => console.log('Server running at http://localhost:3000'))
}

main()
