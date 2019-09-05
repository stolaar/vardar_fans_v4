import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
import { Observable, Subscriber } from "rxjs";
import User from "src/models/User";
import Event from "src/models/Event";
import { UsersService } from "../services/users.service";
import { EventsService } from "../services/events.service";
import { FeedbackService } from "../services/feedback.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  User = {} as User;
  Event = {} as Event;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private eventsService: EventsService,
    private userService: UsersService,
    private feedbackService: FeedbackService
  ) {
    // Get the user from the db
  }
  ngOnInit() {}

  ionViewDidEnter() {
    this.storage
      .get("user")
      .then(userData => {
        this.userService.getUser(userData.id).subscribe(user => {
          this.User = user;
        });
        this.eventsService.getEvents().subscribe(event => {
          console.log(event);
          this.Event = event[0];
        });
      })
      .catch(err => console.log(err.message));
  }

  subscribeToEvent() {
    this.feedbackService.presentAlertConfirm(() =>
      this.eventsService.subscribeToEvent(this.Event, this.User)
    );
  }

  logout() {
    this.storage.remove("user").then(() => {
      this.navCtrl.navigateRoot("login");
    });
  }
}
