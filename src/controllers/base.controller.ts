import { BaseService } from '@/services/base.service';
import { NextFunction, Request, Response } from 'express';

export class BaseController<T> {
  protected service: BaseService<T>;

  public setService(service: BaseService<T>) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: T[] = await this.service.getAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data: T = await this.service.getById(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: T = req.body;
      const data = await this.service.create(newData);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const updatedData: T = req.body;
      const data = await this.service.update(id, updatedData);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const deletedData: T = await this.service.delete(id);
      res.status(200).json(deletedData);
    } catch (error) {
      next(error);
    }
  };
}
