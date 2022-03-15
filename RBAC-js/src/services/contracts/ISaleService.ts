import { ISale } from "../../core/models/ISale";

export interface ISaleService {
  getSales(): Promise<ISale[]>;
};