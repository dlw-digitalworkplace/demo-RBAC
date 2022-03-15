import { IProduct } from "../core/models/IProduct";
import { RBACBase } from "./base/RBACBase";
import { IProductService } from "./contracts/IProductService";

export class ProductService extends RBACBase implements IProductService {
  public async getProducts(): Promise<IProduct[]> {
    try {
      return await this.executeGet<IProduct[]>(`${process.env.RBAC_APP_ID_URI}/api/products`) as IProduct[];
    } catch (error) {
      throw error;
    }
  }
}