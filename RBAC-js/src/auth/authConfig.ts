import { Configuration, RedirectRequest } from "@azure/msal-browser";
import { LambdaFetchClient } from "@pnp/common";
import { msalInstance } from "..";
type storage = "localStorage" | "sessionStorage";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    authority: `https://login.microsoftonline.com/${process.env.RBAC_DIRECTORY_ID}/`,
    clientId: process.env.RBAC_CLIENT_ID as string,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: "/"
  },
  cache: {
    cacheLocation: "localStorage" as storage,
    storeAuthStateInCookie: true
  }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
  scopes: ["User.Read"]
};

export const technidocoApiAuthenticationParameters: RedirectRequest = {
  scopes: [
    `api://${process.env.RBAC_CLIENT_ID}/access_as_user`
  ]
};

export const getLabmdaClient = (redirectRequest: RedirectRequest): LambdaFetchClient => {
  return new LambdaFetchClient(async () => {
    const request = { ...redirectRequest };
    const response = await msalInstance.acquireTokenSilent(request);
    return response.accessToken;
  });
};