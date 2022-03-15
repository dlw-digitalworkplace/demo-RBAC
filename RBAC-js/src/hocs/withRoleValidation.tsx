import React from "react";
import { Redirect } from "react-router-dom";
import { IdClaimsUtils } from "../core/utils/IdClaimsUtils";
import { IWithRoleValidationProps } from "./IWithRoleValidationProps";

export const WithRoleValidation = <P extends Record<string, unknown>>(Component: React.ComponentType<P>):
  // eslint-disable-next-line react/display-name
  React.FC<P & IWithRoleValidationProps> => (props: IWithRoleValidationProps) => {
    const isUserInRole = IdClaimsUtils.isUserInRole(props.userInfo, props.requiredRoles);
    if (!isUserInRole) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }
    else {
      return <Component {...(props as unknown) as P} />;
    }
  };