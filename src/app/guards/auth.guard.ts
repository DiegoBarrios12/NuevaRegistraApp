// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  async canActivate(): Promise<boolean> {
    const user = await this.firebaseService.getCurrentUser();
    
    if (user) {
      return true; // Permitir el acceso si el usuario está autenticado
    } else {
      this.utilsService.presentToast({
        message: 'Debes iniciar sesión para acceder a esta página',
        duration: 2000,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
      
      this.router.navigate(['/auth']); // Redirigir a /auth si no está autenticado para que inicie sesion
      return false;
    }
  }
}

