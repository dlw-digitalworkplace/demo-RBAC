import { AuthenticationResult } from "@azure/msal-common";
import { msalInstance } from "../..";
import { technidocoApiAuthenticationParameters } from "../../auth/authConfig";

export abstract class RBACBase {

  protected async executeGet<T>(action: string, parameters?: string): Promise<T | void> {
    // Fetch authentication token
    const acquireTokenResponse = await this.acquireTokenSilent();

    // build URL
    let urlPathName = action;
    if (parameters) {
      urlPathName += `?${parameters}`;
    }

    // Execute fetch
    const response = await fetch(
      urlPathName,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${acquireTokenResponse.accessToken}`
        },
        method: "GET"
      }
    );

    // Check response
    if (!response.ok) {
      throw new Error(await response.text());
    }

    // Check if response is empty
    if (response.status === 204) {
      return;
    }

    // Return response
    return response.json();
  }

  protected async executePost<T, B>(action: string, body: B): Promise<T | void> {
    // Fetch authentication token
    const acquireTokenResponse = await this.acquireTokenSilent();

    // Execute fetch
    const response = await fetch(
      action,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${acquireTokenResponse.accessToken}`,

        },
        body: JSON.stringify(body),
        method: "POST",
      }
    );

    // Check response
    if (!response.ok) {
      throw new Error(await response.text());
    }

    if (response.status === 204) {
      return;
    }

    // Return response
    return response.json();
  }

  protected async executeDelete<T>(action: string, parameters?: string): Promise<T | void> {
    // Fetch authentication token
    const acquireTokenResponse = await this.acquireTokenSilent();

    // build URL
    let urlPathName = action;
    if (parameters) {
      urlPathName += `?${parameters}`;
    }

    // Execute fetch
    const response = await fetch(
      urlPathName,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${acquireTokenResponse.accessToken}`
        },
        method: "DELETE"
      }
    );

    // Check response
    if (!response.ok) {
      throw new Error(await response.text());
    }

    if (response.status === 204) {
      return;
    }

    // Return response
    return response.json();
  }

  protected async executePatch<T, B>(action: string, body: B, parameters?: string): Promise<T | void> {
    // Fetch authentication token
    const acquireTokenResponse = await this.acquireTokenSilent();

    // build URL
    let urlPathName = action;
    if (parameters) {
      urlPathName += `?${parameters}`;
    }


    // Execute fetch
    const response = await fetch(
      urlPathName,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${acquireTokenResponse.accessToken}`,

        },
        body: JSON.stringify(body),
        method: "PATCH",
      }
    );

    // Check response
    if (!response.ok) {
      throw new Error(await response.text());
    }

    if (response.status === 204) {
      return;
    }

    // Return response
    return response.json();
  }

  private async acquireTokenSilent(): Promise<AuthenticationResult> {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    return msalInstance.acquireTokenSilent({
      ...technidocoApiAuthenticationParameters,
      account: account
    });
  }
}