import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  router = inject(Router);
  toastCrl = inject (ToastController);
  loadingCtrl= inject(LoadingController);
  modalCtrl= inject(ModalController);
  constructor(private firestore: AngularFirestore) {}
  http = inject(HttpClient);
  asistenciasSubject = new BehaviorSubject<any[]>([]);
  asistencias$ = this.asistenciasSubject.asObservable();

  routerlink(url: any){
    this.router.navigateByUrl(url)
  }
  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent'});
  }
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCrl.create(opts);
    toast.present()
  }

  saveLocalStorage(key: string, value: any){
    return localStorage.setItem(key,JSON.stringify(value) );
  }

  getLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }
  async getModal(opts: ModalOptions){
    const modal = await this.modalCtrl.create(opts)
    await modal.present();
    
    const { data }= await modal.onWillDismiss();
    if(data) return data;
    }
    dismissModal(data?: any){
      return this.modalCtrl.dismiss(data);
    }
    async obtenerDatosAsistencia(seccion: string) {
      const url = 'https://pgy4121serverlessapi.vercel.app/api/asistencia/qr?seccion=${seccion}';
      const observable = this.http.get(url, { responseType: 'text' });
      try {
        const responseText = await lastValueFrom(observable);
        return JSON.parse(responseText);
      } catch (error) {
      return await lastValueFrom(observable);
    }
  }

  agregarAsistencia(asistencia: any) {
    const asistenciasActuales = this.asistenciasSubject.value;
    this.asistenciasSubject.next([...asistenciasActuales, asistencia]);
  }
    async takePicture  (promptLabelHeader: string){
      return await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt, //opcion a elegir subir foto o tomar con camara
        promptLabelHeader,
        promptLabelPhoto: 'seleccionar imagen',
        promptLabelPicture:'toma una foto'

      });
    };
   
  // Método para iniciar la cámara y capturar una imagen
  async startCamera(): Promise<string | null> {
    try {
      // Solicitar permisos de la cámara
      const permissions = await Camera.requestPermissions();
      if (permissions.camera !== 'granted') {
        console.warn('Permiso de cámara denegado');
        return null;
      }

      // Capturar imagen con la cámara
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl, // Resultado en formato Base64
        source: CameraSource.Camera, // Usar la cámara
        quality: 90, // Calidad de la imagen
      });

      // Retornar el Data URL de la imagen
      return image.dataUrl ?? null;
    } catch (error) {
      console.error('Error al usar la cámara:', error);
      return null;
    }
  }

  // Método para iniciar el escaneo 
    async startScan(): Promise<string | null> {
    await BarcodeScanner.checkPermission({ force: true });
    await BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    return result.hasContent ? result.content : null;
  }

  async saveAsistencia(asistencia: any, userId: string): Promise<void> {
    try {
      const path = `users/${userId}/asistencias`;
      const id = this.firestore.createId();
      await this.firestore.collection(path).doc(id).set({
        ...asistencia,
        timestamp: new Date(), // Agregar fecha y hora del registro
      });
      console.log(`Asistencia guardada en la colección: ${path}`);
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      throw error;
    }
  }

  // Obtener asistencias de la colección "users/{userId}/asistencias"
  async getAsistencias(userId: string): Promise<void> {
    const path = `users/${userId}/asistencias`;
    this.firestore.collection(path).valueChanges({ idField: 'id' }).subscribe((data: any[]) => {
      this.asistenciasSubject.next(data);
      console.log('Asistencias cargadas:', data);
    });
  }
}