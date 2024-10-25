import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  router = inject(Router);
  toastCrl = inject (ToastController);
  loadingCtrl= inject(LoadingController);

  routerlink(url: any){
    this.router.navigateByUrl(url)
  }
  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent'})
  }
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCrl.create(opts);
    toast.present()
  }

}
