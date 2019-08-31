import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  async login(username, password) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(
        username + "@vardarfans.com",
        password
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async register(user: any) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(
        user.username + "@vardarfans.com",
        user.password
      );
    } catch (err) {
      console.log(err.message);
    }
  }
}
