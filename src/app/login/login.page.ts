import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import User from "../../models/User";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  User: {} = User;
  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  async login() {
    const { username, password }: any = this.User;
    try {
      const loginResult: any = await this.authService.login(username, password);
      if (loginResult) {
        this.storage.set("user", {
          email: loginResult.user.email,
          uid: loginResult.user.uid
        });
        this.navCtrl.navigateRoot("home");
      }
      !loginResult && this.navCtrl.navigateRoot("login");
    } catch (err) {
      console.log(err.message);
    }
  }

  pushRegisterPage() {
    this.navCtrl.navigateRoot("register");
  }
}
