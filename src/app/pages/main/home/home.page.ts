import { Component, inject, OnInit, signal } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Asistencia } from 'src/app/models/asistencia';
import { Employees } from 'src/app/models/employees';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-employee/update-employee.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilsService= inject(UtilsService);
  firebaseService= inject (FirebaseService)
  loading: boolean = false;
  employees: Employees []= [];
  scanResult: string | null = null;
  asistencias: Asistencia[] = [];
 

  async ngOnInit() {

    this.cargarAsistencias();
  }


  ionVewWillEnter(){
    this.getEmployee()
  }
  async addUpdateEmployee( employee?:Employees){
    let modal= await this.utilsService.getModal({
      component: UpdateEmployeeComponent,
      cssClass:'add-update-modal',
      componentProps: { employee }
    })
}
  user(): User {
    return this.utilsService.getLocalStorage('user')
  }
  getEmployee() {
    const path = `users/${this.user().uid}/empleados`;
    this.loading = true;
  
    this.firebaseService.getCollectionData(path)
      .snapshotChanges()
      .subscribe((changes: DocumentChangeAction<User>[]) => {
        const employees = changes.map((c: DocumentChangeAction<User>) => {
          const data = c.payload.doc.data() as User;
          const id = c.payload.doc.id;
          return { id, ...data }; 
        });
        
        console.log(employees);
        this.loading = false;
      });
  }
  async scanQRCode() {
    try {
      // Escaneo o captura según tu necesidad
      const capturedImage = await this.utilsService.startCamera();
      const scannedData = await this.utilsService.startScan();

      if (!capturedImage && !scannedData) {
        throw new Error('No se obtuvo ningún dato');
      }

      console.log('Resultado de la captura o escaneo:', capturedImage || scannedData);

      // Procesar el resultado del escaneo
      const asistencia: Asistencia = this.procesarScanResult(scannedData || '');
      await this.firebaseService.agregarAsistencia(asistencia);

      // Mostrar notificación de éxito
      this.utilsService.presentToast({
        message: 'Asistencia agregada con éxito',
        duration: 2000,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-circle-outline',
      });

      // Cargar asistencias
      this.cargarAsistencias();
    } catch (error) {
      console.error('Error:', error);
      this.utilsService.presentToast({
        message: error.message || 'Error al procesar',
        duration: 2000,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline',
      });
    }
  }

  procesarScanResult(scanResult: string): Asistencia {
    try {
      const parsedData = JSON.parse(scanResult);
      return {
        seccion: parsedData.seccion || 'Sin sección',
        estudiante: parsedData.name || 'Sin nombre',
        estado: parsedData.estado || 'Presente',
        fecha: '', // Automático en Firebase
      };
    } catch {
      console.warn('El resultado no es JSON válido. Usando datos genéricos');
      return {
        seccion: 'Sin sección',
        estudiante: 'Sin nombre',
        estado: 'Presente',
        fecha: '',
      };
    }
  }

  cargarAsistencias() {
    this.firebaseService.obtenerAsistencias().subscribe((data) => {
      this.asistencias = data;
    });
  }
}

