import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
import { Observable, Subscriber } from "rxjs";
import User from "src/models/User";
import Event from "src/models/Event";
import { UsersService } from "../services/users.service";
import { EventsService } from "../services/events.service";

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
    private userService: UsersService
  ) {
    // Get the user from the db
  }

  ngOnInit() {
    this.storage
      .get("user")
      .then(userData => {
        this.userService.getUser(userData.uid).subscribe(user => {
          this.User = user;
        });
        this.eventsService.getEvent(userData.uid).subscribe(event => {
          this.Event = event;
        });
      })
      .catch(err => console.log(err.message));
  }

  logout() {
    this.storage.remove("user").then(() => {
      this.navCtrl.navigateRoot("login");
    });
  }
}
