import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private storage: Storage, private navCtrl: NavController) {}

  logout() {
    this.storage.remove("user").then(() => {
      this.navCtrl.navigateRoot("login");
    });
  }
}
