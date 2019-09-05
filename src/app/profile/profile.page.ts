import { Component, OnInit } from "@angular/core";
import User from "src/models/User";
import Event from "src/models/Event";
import { UsersService } from "../services/users.service";
import { EventsService } from "../services/events.service";
import { FeedbackService } from '../services/feedback.service';
import { Storage } from "@ionic/storage";
import { ToastController, NavController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  User = {} as User;
  Event = {} as Event;

  constructor(
    private storage: Storage,
    private navController: NavController,
    private userService: UsersService,
    private feedbackService: FeedbackService,
    private eventsService: EventsService,
    public toastController: ToastController
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
  }

  async addEvent() {
    try {
      await this.eventsService.addEvent(this.Event, this.User.id);
      return this.feedbackService.showToastMessage("Event has been created!");
    } catch (err) {
      return this.feedbackService.showToastMessage("Error while creating the event!");
    }
  }
}
