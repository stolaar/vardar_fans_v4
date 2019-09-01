import { Component, OnInit } from "@angular/core";
import User from "../../models/User";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  User: {} = User;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  async register() {
    const { username, password, confirmPassword }: any = this.User;
    try {
      password === confirmPassword &&
        (await this.authService.register({
          username: username.trim(),
          password
        }));
    } catch (err) {
      console.log(err.message);
    }
  }
}
