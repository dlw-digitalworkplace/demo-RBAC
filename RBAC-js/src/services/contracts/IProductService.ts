import { IProduct } from "../../core/models/IProduct";

export interface IProductService {
  getProducts(): Promise<IProduct[]>;
};