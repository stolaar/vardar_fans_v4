import { Injectable } from "@angular/core";
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
export class UsersService {
  // Registered users and users registration requests definition
  private users: Observable<User[]>;
  private requestedUsers: Observable<User[]>;
  private usersCollection: AngularFirestoreCollection<User>;
  private requestedUsersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>("users");
    this.requestedUsersCollection = this.afs.collection<User>("requested");

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.requestedUsers = this.requestedUsersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getRequestedUsers(): Observable<User[]> {
    return this.requestedUsers;
  }

  getUser(id: string): Observable<User> {
    return this.usersCollection
      .doc<User>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(user => {
          user.id = id;
          return user;
        })
      );
  }

  getRequestedUser(id: string): Observable<User> {
    return this.requestedUsersCollection
      .doc<User>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(user => {
          user.id = id;
          return user;
        })
      );
  }

  addUser(user: any): Promise<void> {
    return this.usersCollection.doc(user.id).set(user);
  }

  addUserRequest(user: User): Promise<DocumentReference> {
    return this.requestedUsersCollection.add(user);
  }

  deleteUserRequest(id: string): Promise<void> {
    return this.requestedUsersCollection.doc(id).delete();
  }

  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
}
