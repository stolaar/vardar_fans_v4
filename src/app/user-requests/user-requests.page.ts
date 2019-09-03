import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { UsersService } from "../services/users.service";
import { AuthService } from "../services/auth.service";
import { Observable, Subscriber } from "rxjs";
import User from "src/models/User";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-user-requests",
  templateUrl: "./user-requests.page.html",
  styleUrls: ["./user-requests.page.scss"]
})
export class UserRequestsPage implements OnInit {
  User = {} as User;
  private requestedUsers: Observable<User[]>;
  private users: Observable<User[]>;

  constructor(
    public toastController: ToastController,
    private storage: Storage,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.storage
      .get("user")
      .then(userData => {
        this.userService.getUser(userData.id).subscribe(user => {
          this.User = user;
        });
      })
      .catch(err => console.log(err.message));
    this.requestedUsers = this.userService.getRequestedUsers();
    this.users = this.userService.getUsers();
  }

  async approveUser(user: any) {
    try {
      const result = await this.authService.approveRegistration(user);
      return this.addEventFeedback("User approved");
    } catch (err) {
      return this.addEventFeedback("Error occured");
    }
  }

  rejectUser(user: any) {
    this.userService.deleteUserRequest(user.id);
    return this.addEventFeedback("User rejected");
  }

  async addEventFeedback(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
