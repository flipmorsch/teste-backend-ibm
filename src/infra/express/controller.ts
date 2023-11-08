import {GetCustomerOrderUseCase} from '../../application/usecases/get-customer-order.usecase'
import {inject, injectable, singleton} from 'tsyringe'
import {NextFunction, Request, Response} from 'express'
import {HighestOrderUseCase} from '../../application/usecases/highest-order.usecase'
import {LoyalCustomersUsecase} from '../../application/usecases/loyal-customers.usecase'
import {WineRecomendationUseCase} from '../../application/usecases/wine-recomendation.usecase'

@singleton()
export class DefaultController {
  constructor(
    @inject(GetCustomerOrderUseCase)
    private getCustomerOrderUseCase: GetCustomerOrderUseCase,
    @inject(HighestOrderUseCase)
    private highestOrderUseCase: HighestOrderUseCase,
    @inject(LoyalCustomersUsecase)
    private loyalCustomersUsecase: LoyalCustomersUsecase,
    @inject(WineRecomendationUseCase)
    private wineRecomendationUseCase: WineRecomendationUseCase
  ) {}

  async getOrders(req: Request, res: Response) {
    try {
      const result = await this.getCustomerOrderUseCase.execute()
      res.status(200).json(result)
    } catch (error) {
      throw new Error('Something went wrong!')
    }
  }

  async getHighestOrder(req: Request, res: Response) {
    try {
      const result = await this.highestOrderUseCase.execute(
        parseInt(req.params.ano_compra)
      )
      res.status(200).json(result)
    } catch (error) {
      throw new Error('Something went wrong!')
    }
  }

  async getLoyalCustomers(req: Request, res: Response) {
    try {
      const result = await this.loyalCustomersUsecase.execute()
      res.status(200).json(result)
    } catch (error) {
      throw new Error('Something went wrong!')
    }
  }

  async getWineRecomendation(req: Request, res: Response) {
    try {
      const convertedName = req.params.nome.replace(/-/g, ' ')
      const result = await this.wineRecomendationUseCase.execute(convertedName)
      res.status(200).json(result)
    } catch (error) {
      throw new Error('Something went wrong!')
    }
  }
}
