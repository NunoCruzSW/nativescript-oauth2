import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page } from "ui/page";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "ns-authenticated",
  moduleId: module.id,
  templateUrl: "authenticated.component.html"
})
export class AuthenticatedComponent {
  constructor(
    private authService: AuthService, 
    private http: HttpClient,
    private page: Page, 
    private routerExtensions: RouterExtensions) {
    page.actionBarHidden = true;
  }

  public onTapGetMyDetails() {

      this.http
        .get("https://ncruz10:5001/api/v1/account/Profile")
        .subscribe(c => {

          console.log(c);
        });

  }

  public onTapLogout() {
    this.authService.tnsOauthLogout()
    .then(() => {
      this.routerExtensions.back();
    })
    .catch(e => console.log("Error: " + e));
    
  }
}