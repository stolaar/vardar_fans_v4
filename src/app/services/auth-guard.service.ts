import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Storage } from "@ionic/storage";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const { path } = route.routeConfig;
    this.storage.get("user").then(user => {
      if (!user && path !== "register") {
        this.router.navigate(["login"]);
        return false;
      }
      if ((path === "login" || path === "register") && user) {
        this.router.navigate(["home"]);
        return false;
      }
    });
    return true;
  }
}
