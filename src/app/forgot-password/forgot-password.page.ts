import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import User from "../../models/User";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"]
})
export class ForgotPasswordPage implements OnInit {
  User = {} as User;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  forgotPassword(email: any) {
    this.authService.forgotPassword(email);
  }
}
