import { LogLevel, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID,
    authority: process.env.MSAL_AUTHORITY,
    redirectUri: "/#/splashscreen",
    postLogoutRedirectUri: "/#/splashscreen",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    allowPlatformBroker: false,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const msalInstance = new PublicClientApplication(msalConfig);
