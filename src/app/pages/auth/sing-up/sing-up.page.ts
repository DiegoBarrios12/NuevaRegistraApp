import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {
  utilsService= inject(UtilsService);
  firebaseService = inject(FirebaseService);



  constructor() { }

  form= new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  ngOnInit() {
  }

  async submit(){// se llama al boton de registro
    if(this.form.valid){
      const loading = await this.utilsService.loading(); //está cargando la informacion

      await loading.present() 

      this.firebaseService.signUp(this.form.value as User) //se envian los valores
      .then( async resp =>{ 
        await this.firebaseService.updateUser(this.form.value.name)
        
        let uid = resp.user.uid;
        this.form.controls.uid.setValue(uid) // se llama al id
        
        //funcion de set
        this.setUserInfo(uid);


      }) .catch(error =>{
        console.log(error)
        this.utilsService.presentToast({
          message: error.message,
          duration: 2000,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })
      }).finally(() =>{
        loading.dismiss();
      })
    }
    
  }
  
  //funcion que permite hacer el set que es llamado arriba
  async setUserInfo(uid: string){
    if(this.form.valid){
      const loading = await this.utilsService.loading();

      await loading.present()

      let path=`users/${uid}`;
      delete this.form.value.password; //se elimina la contraseña del usuario

      this.firebaseService.setDocument(path,this.form.value)//se envian los valores
      .then( async resp =>{ //se recibe la respuesta de los valores enviados
        
        this.utilsService.saveLocalStorage('user', this.form.value);//trae la informacion ubicada en user
        this.utilsService.routerlink('/main/home');
        this.form.reset();


      }) .catch(error =>{ //manejo de errores
        console.log(error)
        this.utilsService.presentToast({
          message: error.message,
          duration: 2000,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })
      }).finally(() =>{
        loading.dismiss();
      })
    }
    
  }
}
