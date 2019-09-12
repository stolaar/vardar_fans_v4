import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { UsersService } from "./users.service";
import { FeedbackService } from "./feedback.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private feedbackService: FeedbackService,
    public afAuth: AngularFireAuth,
    private userService: UsersService
  ) {}

  async login(username, password) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(
        username.trim(),
        password
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async forgotPassword(email: any) {
    return await this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.feedbackService.showToastMessage(
          "Линкот за ресетирање на лозинката е пратен"
        );
      })
      .catch(() =>
        this.feedbackService.showToastMessage("Грешка при праќање на маилот!")
      );
  }

  async register(user: any) {
    try {
      const { username, userID, password, name } = user;
      if (!username.includes("@")) {
        return false; //"Погрешен е-маил";
      } else
        await this.userService.addUserRequest({
          username: username,
          userID,
          password,
          name
        });
      return "Админот ќе го разгледа барањето за регистрација и ќе ви испрати е-маил со потврда";
    } catch (err) {
      return this.feedbackService.showToastMessage(err.message);
    }
  }

  async approveRegistration(user: any) {
    try {
      const { username, userID, password } = user;
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        username,
        password
      );
      this.userService.deleteUserRequest(user.id);
      user.password = null;
      user.id = result.user.uid;
      await this.userService.addUser({
        username: username,
        userID,
        ...user
      });
      return true;
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
