import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { every } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
 router=inject(Router);
  currentPaht: string ='';

 pages=[
    { title: 'Inicio', url:'/main/home', icon:'home-outline'},
    { title: 'Perfil', url:'/main/profile', icon:'person-outline'} 
 ] 
  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPaht= event.url
    })
  }
 
}
