import {
    TnsOAuthClient,
    configureTnsOAuth,
    ITnsOAuthTokenResult
} from "nativescript-oauth2";
import {
    TnsOaProvider,
    TnsOaProviderOptionsIdentityServer,
    TnsOaProviderIdentityServer
} from "nativescript-oauth2/providers";

export function configureOAuthProviders() {
    const identityServer = configureOAuthProviderIdentityServer();

    configureTnsOAuth([identityServer]);
}

export function configureOAuthProviderIdentityServer(): TnsOaProvider {
    const identityServerProviderOptions: TnsOaProviderOptionsIdentityServer = {
      openIdSupport: "oid-full",
      issuerUrl: "https://devbot.softworks.local:4432",
      clientId: "selfservice-mobile",
      urlScheme: "selfserviceapp",
      redirectUri: "selfserviceapp://oidc",
      scopes: ["openid", "profile", "email", "offline_access", "api1"]
    };
    const identityServerProvider = new TnsOaProviderIdentityServer(
      identityServerProviderOptions
    );
    return identityServerProvider;
  }
