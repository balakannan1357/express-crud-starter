import { User } from '@/interfaces/users.interface';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';
import { BaseRoute } from './base.route';

export class UserRoute extends BaseRoute<User> {
  public path = '/users';
  public router = Router();
  public controller = new UserController();

  constructor() {
    super();
    this.initializeBaseRoutes(this.router, this.path, this.controller, CreateUserDto);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.controller.createUser);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateUserDto, 'body', true), this.controller.updateUser);
  }
}
