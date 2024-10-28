import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Asistencia } from 'src/app/models/asistencia';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-agregar-asistencia',
  templateUrl: './agregar-asistencia.component.html',
  styleUrls: ['./agregar-asistencia.component.scss']
})


export class AgregarAsistenciaComponent {
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  asistencia = { } as Asistencia;

  form = new FormGroup({
    seccion: new FormControl('null', [Validators.required]),
    fecha: new FormControl('null', [Validators.required]),
    estudiante: new FormControl('null', [Validators.required]),
    estado: new FormControl('null', [Validators.required]),
  });
    asistencias = new BehaviorSubject<any[]>([]);
    asistencias$ = this.asistencias.asObservable();

  agregarAsistencia(asistencia: any) {
    const asistenciasActuales = this.asistencias.getValue();
    this.asistencias.next([...asistenciasActuales, asistencia]);
  }
  ngOnInit() {
    
  }
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();

      this.firebaseService.agregarAsistencia(this.form.value).then(() => {// no se porque sale el error
        this.utilsService.presentToast({
          message: 'Asistencia agregada con éxito',
          duration: 2000,
          color: 'success',
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        });
        this.form.reset(); // Limpiar el formulario después de agregar
      }).catch(error => {
        console.error('Error al agregar asistencia:', error);
        this.utilsService.presentToast({
          message: 'Error al agregar asistencia',
          duration: 2000,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
  
  guardarAsistencia() {if (this.form.valid) {
    this.utilsService.agregarAsistencia(this.form.value);
    this.form.reset();
  }
}
  
}