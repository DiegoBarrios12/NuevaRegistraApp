import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { every } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  router=inject(Router);
  firebaseServices= inject(FirebaseService)
  currentPaht: string ='';
  utilsService = inject(UtilsService)

 pages=[
    { title: 'Inicio', url:'/main/home', icon:'home-outline'},
    { title: 'Perfil', url:'/main/profile', icon:'person-outline'} 
 ] 
  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPaht= event.url
    })
  }
  
  signOut(){ //funcion hecha en firebase services para cerrar sesion
    this.firebaseServices.signOut()
  }
  user(): User{
    return this.utilsService.getLocalStorage('user');
  }
}
