import { Component, inject, OnInit } from '@angular/core';
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
  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);
  loading: boolean = false;
  employees: Employees[] = [];
  scanResult: string | null = null;
  asistencias: Asistencia[] = [];

  async ngOnInit() {
    const userId = this.user().uid;
    this.utilsService.getAsistencias(userId);
  }

  ionViewWillEnter() {
    this.getEmployee();
  }

  async addUpdateEmployee(employee?: Employees) {
    await this.utilsService.getModal({
      component: UpdateEmployeeComponent,
      cssClass: 'add-update-modal',
      componentProps: { employee },
    });
  }

  cargarAsistencias() {
    const userId = this.user().uid;
    this.utilsService.getAsistencias(userId);
    this.utilsService.asistencias$.subscribe((data) => {
      this.asistencias = data;
    });
  }

  user(): User {
    return this.utilsService.getLocalStorage('user');
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
      this.scanResult = await this.utilsService.startScan();
      console.log('Resultado del escaneo:', this.scanResult);

      if (this.scanResult) {
        const asistencia: Asistencia = this.procesarScanResult(this.scanResult);
        const userId = this.user().uid;
        await this.utilsService.saveAsistencia(asistencia, userId);
        this.utilsService.presentToast({
          message: 'Asistencia agregada con éxito',
          duration: 2000,
          color: 'success',
          position: 'bottom',
          icon: 'checkmark-circle-outline',
        });
        this.cargarAsistencias();
      }
    } catch (error) {
      console.error('Error al procesar el escaneo:', error);
      this.utilsService.presentToast({
        message: error.message || 'Error al procesar el escaneo',
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
        fecha: this.getFormattedDateTime(),
      };
    } catch {
      console.warn('El resultado no es JSON válido.');
      return {
        seccion: 'Sin sección',
        estudiante: 'Sin nombre',
        estado: 'Presente',
        fecha: this.getFormattedDateTime(),
      };
    }
  }
  private getFormattedDateTime(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  
}
