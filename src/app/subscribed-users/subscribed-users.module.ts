import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { SubscribedUsersPage } from "./subscribed-users.page";

const routes: Routes = [
  {
    path: "",
    component: SubscribedUsersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubscribedUsersPage]
})
export class SubscribedUsersPageModule {}
