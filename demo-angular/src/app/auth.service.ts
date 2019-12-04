import { Injectable } from "@angular/core";

import {
  TnsOAuthClient,
  ITnsOAuthTokenResult
} from "nativescript-oauth2";

@Injectable()
export class AuthService {
  private client: TnsOAuthClient = null;
  private currentTokenData: ITnsOAuthTokenResult = null;
  constructor() {}

  public tnsOauthLogin(
    providerType,
    tenantCode?: string
  ): Promise<ITnsOAuthTokenResult> {
    this.client = new TnsOAuthClient(providerType);

    this.client.provider.options.customQueryParams = {
      acr_values: "tenant:" + tenantCode
    };
    return new Promise<ITnsOAuthTokenResult>((resolve, reject) => {
      this.client.loginWithCompletion(
        (tokenResult: ITnsOAuthTokenResult, error) => {
          if (error) {
            console.error("back to main page with error: ");
            console.error(error);
            reject(error);
          } else {
            console.log("back to main page with access token: ");
            console.log(tokenResult);
            this.currentTokenData = tokenResult;
            resolve(tokenResult);
          }
        }
      );
    });
  }

  public isTokenValid(){

     
     if (this.currentTokenData && this.currentTokenData.accessTokenExpiration) {
     
      return new Date().getTime() < this.currentTokenData.accessTokenExpiration.getTime();
    } else {
      return true;
    }
  }

  public getToken(): Promise<string>{
    
      return new Promise(resolve=>{
        if(this.isTokenValid()){
          resolve(this.currentTokenData.accessToken);
        }
        else {
          
          this.client.refreshTokenWithCompletion(cb => {
            this.currentTokenData = cb;
            resolve(cb.accessToken);
          });
        }
      });
  }

  public tnsOauthLogout(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.client) {
        this.client.logoutWithCompletion(error => {
          if (error) {
            console.error("back to main page with error: ");
            console.error(error);
            reject(error);
          } else {
            console.log("back to main page with success");
            resolve();
          }
        });
      } else {
        console.log("back to main page with success");
        resolve();
      }
    });
  }
}

