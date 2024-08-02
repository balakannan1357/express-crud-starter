import { BaseController } from '@controllers/base.controller';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class UserController extends BaseController<User> {
  private readonly _service = Container.get(UserService);
  constructor() {
    super();
    this.setService(this._service);
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this._service.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updateUserData: User = await this._service.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
