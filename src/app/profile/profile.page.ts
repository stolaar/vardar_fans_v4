import { Component, OnInit } from "@angular/core";
import User from "src/models/User";
import Event from "src/models/Event";
import { UsersService } from "../services/users.service";
import { EventsService } from "../services/events.service";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";

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
    private userService: UsersService,
    private eventsService: EventsService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.storage
      .get("user")
      .then(userData => {
        this.userService.getUser(userData.uid).subscribe(user => {
          this.User = user;
        });
      })
      .catch(err => console.log(err.message));
  }

  async addEvent() {
    try {
      await this.eventsService.addEvent(this.Event, this.User.id);
      return this.addEventFeedback("Event has been created!");
    } catch (err) {
      return this.addEventFeedback("Error while creating the event!");
    }
  }
  async addEventFeedback(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
