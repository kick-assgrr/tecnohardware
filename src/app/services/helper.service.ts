import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  sumar(n1: number, n2: number) {
    var result = n1 + n2;
    return result;
  }

  async showAlert(msg: string, title: string) {
    var alert = await this.alertController.create({
      cssClass: "alertClass",
      message: msg,
      header: title,
      buttons: ['Aceptar']
    });
    await alert.present();
    return alert;
  }

  async showConfirm(message: string, btn_confirmar: string, btn_cancelar: string) {
    let promise = new Promise<boolean>(async (resolve) => {
      var alert = await this.alertController.create({
        cssClass: "",
        message: message,
        buttons: [
          {
            text: btn_confirmar,
            handler: () => {
              resolve(true);
            }
          },
          {
            text: btn_cancelar,
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          }
        ]
      });
      await alert.present();
    });
    return promise;
  }

  async showLoader(msg: string) {
    var loader = await this.loadingController.create({
      cssClass: "loaderClass",
      message: msg,
      translucent: true
    });
    await loader.present();
    return loader;
  }

  async showToast(msg: string, duracion: number = 3000) {
    var toast = await this.toastController.create({
      cssClass: "toastCss",
      position: 'bottom',
      color: 'success', 
      message: msg,
      duration: duracion
    });
    await toast.present();
    return toast;
  }

  async showModal(componente: any, props: any = {}, dismiss = false) {
    var modal = await this.modalController.create({
      cssClass: "cssModal",
      component: componente,
      componentProps: props,
      backdropDismiss: dismiss
    });
    await modal.present();
  }

  async showPrompt(title: string, message: string, defaultValue: string): Promise<string | null> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        inputs: [
          {
            name: 'input',
            type: 'text',
            value: defaultValue
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(null)
          },
          {
            text: 'Aceptar',
            handler: (data) => resolve(data.input)
          }
        ]
      });
      await alert.present();
    });
  }

  async showPasswordPrompt(title: string): Promise<string | null> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Nueva contraseña'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(null)
          },
          {
            text: 'Aceptar',
            handler: (data) => resolve(data.password)
          }
        ]
      });
      await alert.present();
    });
  }
}
