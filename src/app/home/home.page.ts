import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
import { Observable, Subscriber } from "rxjs";
import User from "src/models/User";
import Event from "src/models/Event";
import { UsersService } from "../services/users.service";
import { EventsService } from "../services/events.service";
import { FeedbackService } from "../services/feedback.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  User = {} as User;
  Event = {} as Event;
  private usersGoingCount: any;
  private events: Event[];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private router: Router,
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
          this.events = event;
          this.events.forEach(event => {
            event.expired = new Date(event.date).getTime() < Date.now();
            new Date(event.date).getTime() < Date.now() - 259200 * 1000 &&
              this.eventsService.deleteEvent(event.id);
            event.usersGoingCount = event.usersGoing
              ? event.usersGoing.length
              : 0;
          });
        });
      })
      .catch(err => console.log(err.message));
  }

  subscribeToEvent(event: any) {
    this.feedbackService.presentAlertConfirm(() =>
      this.eventsService.subscribeToEvent(event, this.User)
    );
  }

  subscribedUsersList(event: any) {
    this.eventsService.getEventSubscribers(event).then(() => {
      this.router.navigate(["subscribed-users"], {
        queryParams: {
          event: JSON.stringify(event)
        }
      });
    });
  }

  showEvent(index: any) {
    this.events[index].show = !this.events[index].show;
  }

  logout() {
    this.storage.remove("user").then(() => {
      this.navCtrl.navigateRoot("login");
    });
  }
}
