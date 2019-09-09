import { Component, OnInit } from "@angular/core";
import { EventsService } from "../services/events.service";
import { Storage } from "@ionic/storage";
import User from "src/models/User";
import { UsersService } from "../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import Event from "src/models/Event";
import { Observable } from "rxjs";

@Component({
  selector: "app-subscribed-users",
  templateUrl: "./subscribed-users.page.html",
  styleUrls: ["./subscribed-users.page.scss"]
})
export class SubscribedUsersPage implements OnInit {
  private eventSubscribers: User[];
  User = {} as User;
  private event: Observable<Event>;
  private eventId: any;

  constructor(
    private eventService: EventsService,
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {
    //this.eventSubscribers = this.eventService.showEventSubscribers();
    this.route.queryParams.subscribe(params => {
      if (params && params.event) {
        this.event = this.eventService.getEvent(JSON.parse(params.event).id);
        this.eventId = JSON.parse(params.event).id;
      }
    });
  }
  ionViewDidEnter() {
    this.storage.get("user").then(userData => {
      this.userService.getUser(userData.id).subscribe(user => {
        this.User = user;
      });
    });
    this.event.subscribe(data => {
      this.eventSubscribers = data.usersGoing;
    });
    //this.eventSubscribers = this.eventService.showEventSubscribers();
  }

  updateUserGoing(userIndex: any, hasPaid: any) {
    /*this.event.subscribe(data => {
      this.eventData = data;
    }); */
    this.eventService.updateUserGoing(
      this.eventSubscribers,
      this.eventId,
      userIndex,
      hasPaid
    );
  }

  ngOnInit() {}
}
