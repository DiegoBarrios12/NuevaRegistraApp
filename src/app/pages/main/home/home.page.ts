import { Component, inject, OnInit, signal } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Employees } from 'src/app/models/employees';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-employee/update-employee.component';
import { AngularFirestoreCollection, } from '@angular/fire/compat/firestore';
import { Observable, OperatorFunction } from 'rxjs';

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
  asistencia: any;
  

  async ngOnInit() {
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
      this.scanResult = await this.utilsService.startScan();
      console.log('Resultado del escaneo:', this.scanResult);
    } catch (error) {
      console.error('Error al escanear QR:', error);
    }
  }

  async loadAsistencia(seccion: string) {
    try {
      this.asistencia = await this.utilsService.obtenerDatosAsistencia(seccion);
      console.log('Asistencia:', this.asistencia);
    } catch (error) {
      console.error('Error al obtener asistencia:', error);
    }
  }

}

