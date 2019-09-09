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
      duration: 5000
    });
    toast.present();
  }

  async presentAlertConfirm(heading, subheading, callback) {
    const alert = await this.alertController.create({
      header: heading,
      message: subheading,
      buttons: [
        {
          text: "Не",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            //
          }
        },
        {
          text: "Да",
          handler: () => {
            callback();
          }
        }
      ]
    });

    await alert.present();
  }
}
