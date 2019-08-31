import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private storage: Storage, private navCtrl: NavController) {
    // this.storage
    //   .get("user")
    //   .then(user => {
    //     !user && this.navCtrl.navigateRoot("login");
    //   })
    //   .catch(err => console.log(err.message));
  }

  logout() {
    this.storage.remove("user").then(() => {
      this.navCtrl.navigateRoot("login");
    });
  }
}
