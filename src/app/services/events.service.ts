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

@Injectable({
  providedIn: "root"
})
export class EventsService {
  private events: Observable<Event[]>;
  private eventsCollection: AngularFirestoreCollection<Event>;

  constructor(private afs: AngularFirestore) {
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

  addEvent(event: Event, id: string): Promise<void> {
    return this.eventsCollection.doc(id).set(event);
  }

  async subscribeToEvent(event: any, user: any) {
    try {
      const usersGoing = event.usersGoing ? [...event.usersGoing] : [];
      usersGoing.push(user);
      await this.eventsCollection.doc(event.id).update({ usersGoing });
    } catch (err) {
      console.log(err.message);
    }
  }
}
