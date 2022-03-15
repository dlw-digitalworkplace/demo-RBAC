import { AppRole } from "../enums/AppRole";

export interface IIdTokenClaims {
  roles: AppRole[]
}