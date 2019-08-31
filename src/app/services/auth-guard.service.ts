import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Storage } from "@ionic/storage";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route.routeConfig.path);
    this.storage.get("user").then(user => {
      if (!user) {
        this.router.navigate(["login"]);
        return false;
      }
      if (
        route.routeConfig.path === "login" ||
        route.routeConfig.path === "register"
      ) {
        this.router.navigate(["home"]);
        return false;
      }
    });
    return true;
  }
}
