import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  constructor() { }

  form= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const loading = await this.utilsService.loading();

      await loading.present()

      this.firebaseService.signIn(this.form.value as User)
      .then(resp =>{
        this.getUserInfo(resp.user.uid)
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
  
  async getUserInfo(uid: string){//obtener informacion del usuario luego de login
    if(this.form.valid){
      const loading = await this.utilsService.loading();

      await loading.present()

      let path=`users/${uid}`;

      this.firebaseService.getDocument(path)//obtener la informacion de firebase
      .then( (user: User) =>{ //se recibe la respuesta de los valores enviados
        
        this.utilsService.saveLocalStorage('user', user);//trae la informacion ubicada en user (local storage)
        this.utilsService.routerlink('/main/home');
        this.form.reset();

        this.utilsService.presentToast({
          message: `Bienvenido ${user.name}`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'person-circle-outline'
        })

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
