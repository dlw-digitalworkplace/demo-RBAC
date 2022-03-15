import { AccountInfo } from "@azure/msal-common";
import { AppRole } from "../enums/AppRole";
import { IIdTokenClaims } from "../models/IIDTokenClaims";

export class IdClaimsUtils {
  public static isUserInRole(user: AccountInfo, applicableRoles: AppRole[]): boolean {
    // No roles were passed in, so return true
    if (!applicableRoles || applicableRoles.length < 1) {
      return true;
    }

    // If the user has no roles applicable, return false
    if (!!user && !!user.idTokenClaims) {
      const claims = user.idTokenClaims as IIdTokenClaims;
      const userRoles = claims.roles as string[];
      const matchingRoles = !!userRoles ? applicableRoles.filter(role => userRoles.includes(role)) : [];
      return matchingRoles.length > 0;
    }
    return false;
  }
}