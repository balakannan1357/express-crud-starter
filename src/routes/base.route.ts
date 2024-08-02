import { BaseController } from '@/controllers/base.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class BaseRoute<T> {
  public initializeBaseRoutes(router: Router, path: string, controller: BaseController<T>, dto: any) {
    router.get(`${path}/getAll`, controller.getAll);
    router.get(`${path}/getById/:id`, controller.getById);
    router.post(`${path}`, ValidationMiddleware(dto, 'body'), controller.create);
    router.put(`${path}/:id`, ValidationMiddleware(dto, 'body', true), controller.update);
    router.delete(`${path}/:id`, controller.delete);
  }
}
