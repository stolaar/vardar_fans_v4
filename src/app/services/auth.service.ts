import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { UsersService } from "./users.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private userService: UsersService
  ) {}

  async login(username, password) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(
        username.trim() + "@vardarfans.com",
        password
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async register(user: any) {
    try {
      const { username, userID, password } = user;

      await this.userService.addUserRequest({
        username: username + "@vardarfans.com",
        userID,
        password
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  /* async registerAdmin(user: any) {
    try {
      const { username, userID, password } = user;
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        username + "@vardarfans.com",
        password
      );
      await this.userService.addUser({
        id: result.user.uid,
        username: username + "@vardarfans.com",
        userID,
        role: "admin"
      });
    } catch (err) {
      console.log(err.message);
    }
  } */
}
