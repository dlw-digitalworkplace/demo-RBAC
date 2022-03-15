
import { ISale } from "../core/models/ISale";
import { RBACBase } from "./base/RBACBase";
import { ISaleService } from "./contracts/ISaleService";

export class SaleService extends RBACBase implements ISaleService {
  public async getSales(): Promise<ISale[]> {
    try {
      return await this.executeGet<ISale[]>(`${process.env.RBAC_APP_ID_URI}/api/sales`) as ISale[];
    } catch (error) {
      throw error;
    }
  }
}