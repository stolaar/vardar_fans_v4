import { Injectable } from "@angular/core";
import Event from "../../models/Event";
import User from "../../models/User";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { FeedbackService } from "./feedback.service";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  private events: Observable<Event[]>;
  private eventsCollection: AngularFirestoreCollection<Event>;
  private eventSubscribers: any;
  constructor(
    private afs: AngularFirestore,
    private feedbackService: FeedbackService
  ) {
    this.eventsCollection = this.afs.collection<Event>("events");

    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getEvents(): Observable<Event[]> {
    return this.events;
  }

  getEvent(id: string): Observable<Event> {
    return this.eventsCollection
      .doc<Event>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(event => {
          return event;
        })
      );
  }

  addEvent(event: Event, id: string): Promise<DocumentReference> {
    return this.eventsCollection.add(event);
  }

  async subscribeToEvent(event: any, user: any) {
    try {
      const usersGoing = event.usersGoing ? [...event.usersGoing] : [];
      this.eventSubscribers = usersGoing;
      usersGoing.filter(userGoing => userGoing.id === user.id).length < 1
        ? usersGoing.push(user) &&
          this.feedbackService.showToastMessage("You are added to the list")
        : this.feedbackService.showToastMessage("You are already going");
      await this.eventsCollection.doc(event.id).update({ usersGoing });
    } catch (err) {
      console.log(err.message);
    }
  }

  async getEventSubscribers(event: any) {
    this.eventSubscribers = event.usersGoing ? [...event.usersGoing] : [];
    console.log(this.eventSubscribers);
    return this.eventSubscribers;
  }
  deleteEvent(id: any) {
    return this.eventsCollection.doc(id).delete();
  }

  showEventSubscribers() {
    return this.eventSubscribers;
  }
}
