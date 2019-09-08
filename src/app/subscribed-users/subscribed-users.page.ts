import { Component, OnInit } from "@angular/core";
import { EventsService } from "../services/events.service";

@Component({
  selector: "app-subscribed-users",
  templateUrl: "./subscribed-users.page.html",
  styleUrls: ["./subscribed-users.page.scss"]
})
export class SubscribedUsersPage implements OnInit {
  private eventSubscribers: any;
  constructor(private eventService: EventsService) {
    this.eventSubscribers = this.eventService.showEventSubscribers();
  }
  ionViewDidEnter() {
    this.eventSubscribers = this.eventService.showEventSubscribers();
  }

  ngOnInit() {}
}
