// MSAL imports
import { AuthenticationResult, EventMessage, EventType, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { msalConfig } from "./auth/authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

// Component
const AppProvider = () => (
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);

ReactDOM.render(<AppProvider />, document.getElementById("app"));


