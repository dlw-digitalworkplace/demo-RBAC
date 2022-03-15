import * as React from "react";
import { useHistory } from "react-router-dom";
import { IdClaimsUtils } from "../../core/utils/IdClaimsUtils";
import { INavBannerProps } from "./INavBannerProps";
import styles from "./NavBanner.module.scss";
import { AppRole } from "../../core/enums/AppRole";

export const NavBanner: React.FC<INavBannerProps> = ({ account }) => {
  const history = useHistory();

  return (
    <nav className={styles.navBanner}>
      <h2>RBAC Store</h2>
      <ul>
        <li>
          <a onClick={() => history.push("/")}>Products</a>
        </li>
        {
          IdClaimsUtils.isUserInRole(account, [AppRole.Administration, AppRole.Sales]) && (
            <li>
              <a onClick={() => history.push("/sales")}>Sales</a>
            </li>
          )
        }
      </ul>
      <span>{account?.username}</span>
    </nav>
  );
};