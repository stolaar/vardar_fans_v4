import { Component, OnInit } from "@angular/core";
import User from "../../models/User";
import { AuthService } from "../services/auth.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  User = {} as User;
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async register() {
    const { username, password, confirmPassword, userID }: any = this.User;
    try {
      password === confirmPassword &&
        (await this.authService.register({
          username: username.trim(),
          password,
          userID
        }));
      this.navCtrl.navigateRoot("login");
    } catch (err) {
      console.log(err.message);
    }
  }

  pushLoginPage() {
    this.navCtrl.navigateRoot("login");
  }
}
