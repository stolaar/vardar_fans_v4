import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfilePageModule",
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
