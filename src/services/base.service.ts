import { HttpException } from '@/exceptions/httpException';
import { Model } from 'mongoose';
import { Service } from 'typedi';

@Service()
export class BaseService<T> {
  protected readonly _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async getAll(): Promise<T[]> {
    return this._model.find();
  }

  public async getById(id: string): Promise<T> {
    const item: T = await this._model.findById(id);
    if (!item) throw new HttpException(204, `${this._model.modelName} not found`);
    return item;
  }

  public async create(data: any): Promise<T> {
    const findItem: T = await this._model.findOne({ _id: data._id });
    if (findItem) return this.update(data._id, data);
    const newItem = await this._model.create(data);
    return newItem;
  }

  public async update(id: string, data: any): Promise<T> {
    const updatedItem: T = await this._model.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!updatedItem) throw new HttpException(204, `${this._model.modelName} not found`);
    return updatedItem;
  }

  public async delete(id: string): Promise<T> {
    const deletedItem: T = await this._model.findByIdAndDelete(id);
    if (!deletedItem) throw new HttpException(204, `${this._model.modelName} not found`);
    return deletedItem;
  }
}
