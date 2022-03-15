import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { IMsalContext, MsalAuthenticationResult, MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.scss";

import Products from "./routes/products/Products";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { NavBanner } from "./components/navBanner/NavBanner";
import Sales from "./routes/sales/Sales";
import { AppRole } from "./core/enums/AppRole";

const App: React.FC = () => {
  const [appInitialized, setAppIsInitialized] = useState<boolean>(false);
  const [initError, setInitError] = useState<string>("");
  const { inProgress, accounts } = useMsal();
  const loginAuthRequest = {
    scopes: ["openid", "profile"]
  };

  useEffect(() => {
    const initializeApplication = async () => {
      try {
        initializeIcons();
        setAppIsInitialized(true);
      } catch (error) {
        setInitError((error as Error).message);
      }
    };

    // Initialization on succesfull authentications
    if (inProgress === InteractionStatus.None) {
      initializeApplication();
    }
  }, [inProgress]);


  const renderRoutes = (): JSX.Element => {
    const currentUser = accounts?.[0];

    return (
      <>
        <NavBanner account={currentUser} />
        <Switch>
          <Route exact path={"/"}>
            <Products />
          </Route>
          <Route exact path={"/sales"}>
            {<Sales requiredRoles={[AppRole.Administration, AppRole.Sales]} userInfo={currentUser} />}
          </Route>
        </Switch>
      </>
    );
  };

  const renderError = (errorMessage: string): JSX.Element => {
    return <div>{errorMessage}</div>;
  };

  const renderLoading = (context: IMsalContext): JSX.Element => {
    return <div>{context.inProgress}</div>;
  };

  if (!!initError) {
    return renderError(initError);
  }

  return (
    <div className={styles.container}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginAuthRequest}
        errorComponent={(result: MsalAuthenticationResult) => renderError(result.error?.errorMessage ?? "")}
        loadingComponent={renderLoading}
      >
        {appInitialized ? (
          <Router>
            <div className={styles.main}>
              <main className={styles.mainContent}>
                {renderRoutes()}
              </main>
            </div>
          </Router>
        ) : (
          <p>Loading...</p>
        )}
      </MsalAuthenticationTemplate>
    </div>
  );
};

export default App;