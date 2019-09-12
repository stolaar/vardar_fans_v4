import { Component, OnInit, OnDestroy } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
import { Observable, Subscriber, Subscription } from "rxjs";
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
export class HomePage implements OnInit, OnDestroy {
  User = {} as User;
  Event = {} as Event;
  subscription: Subscription;
  private usersGoingCount: any;
  private events: any;

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
        this.subscription = this.eventsService.getEvents().subscribe({
          complete: () => console.log("completed"),
          error: () => console.log("error"),
          next: event => {
            this.events = event;
            this.events.forEach(event => {
              event.expired = new Date(event.date).getTime() < Date.now();
              new Date(event.date).getTime() < Date.now() - 259200 * 1000 &&
                this.eventsService.deleteEvent(event.id);
              event.usersGoingCount = event.usersGoing
                ? event.usersGoing.length
                : 0;
            });
          }
        });
      })
      .catch(err => console.log(err.message));
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribeToEvent(event: any) {
    this.feedbackService.presentAlertConfirm(
      "Потврди!",
      "Дали ќе присуствуваш на настанот?",
      () => this.eventsService.subscribeToEvent(event, this.User)
    );
  }

  subscribedUsersList(event: any) {
    //this.eventsService.getEventSubscribers(event).then(() => {
    this.router.navigate(["subscribed-users"], {
      queryParams: {
        event: JSON.stringify(event)
      }
    });
    // });
  }

  showEvent(index: any) {
    this.events[index].show = !this.events[index].show;
  }

  logout() {
    this.feedbackService.presentAlertConfirm(
      "Одјави се",
      "Сигурен си дека сакаш да се одјавиш?",
      () => {
        this.storage.remove("user").then(() => {
          this.navCtrl.navigateRoot("login");
        });
      }
    );
  }
}
