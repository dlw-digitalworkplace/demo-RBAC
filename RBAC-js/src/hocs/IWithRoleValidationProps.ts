import { AccountInfo } from "@azure/msal-common";
import { AppRole } from "../core/enums/AppRole";

export interface IWithRoleValidationProps {
  requiredRoles: AppRole[];
  userInfo: AccountInfo;
};