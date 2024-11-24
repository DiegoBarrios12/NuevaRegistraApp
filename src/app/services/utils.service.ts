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
      const url = `https://pgy4121serverlessapi.vercel.app/api/asistencia/qr?seccion=${seccion}`;
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

  // Método para iniciar el escaneo (puedes adaptarlo según tu lógica)
  async startScan(): Promise<string | null> {
    try {
      // Simular un resultado de escaneo
      const simulatedScanResult = JSON.stringify({
        seccion: 'A1',
        name: 'Estudiante Demo',
        estado: 'Presente',
      });

      // Retornar el resultado simulado como string
      return simulatedScanResult;
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      return null;
    }
  }
  
    async saveScanData(data: string, userId: string): Promise<void> {
      const path = `users/${userId}/scans`;
      const id = this.firestore.createId();
      await this.firestore.collection(path).doc(id).set({ data, timestamp: new Date() });
    }
    
    
  

}
