import { Injectable } from "@angular/core";
import { ToastController, AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class FeedbackService {
  constructor(
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  async showToastMessage(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm(callback) {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Would you like to subscribe to this event?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            //
          }
        },
        {
          text: "Going",
          handler: () => {
            callback();
          }
        }
      ]
    });

    await alert.present();
  }
}
