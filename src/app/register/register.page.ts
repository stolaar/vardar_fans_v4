import { Component, OnInit } from "@angular/core";
import User from "../../models/User";
import { AuthService } from "../services/auth.service";
import { NavController } from "@ionic/angular";
import { FeedbackService } from "../services/feedback.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  User = {} as User;
  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  register() {
    const {
      username,
      password,
      confirmPassword,
      userID,
      name
    }: any = this.User;

    if (password === confirmPassword) {
      this.authService
        .register({
          username: username.trim(),
          password,
          userID,
          name
        })
        .then(message => {
          message && this.feedbackService.showToastMessage(message);
          message && this.navCtrl.navigateRoot("login");
          throw !message && new Error("Настана грешка");
        })
        .catch(err => {
          this.feedbackService.showToastMessage(err.message);
        });
    } else
      return this.feedbackService.showToastMessage("Лозинките не се совпаѓаат");
  }

  pushLoginPage() {
    this.navCtrl.navigateRoot("login");
  }
}
