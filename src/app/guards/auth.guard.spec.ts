import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { User } from 'src/app/models/user.model';  // Importa el modelo User correctamente

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;

  beforeEach(() => {
    // Crear mocks de los servicios inyectados
    const firebaseSpy = jasmine.createSpyObj('FirebaseService', ['getCurrentUser']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const utilsSpy = jasmine.createSpyObj('UtilsService', ['presentToast']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: FirebaseService, useValue: firebaseSpy },
        { provide: Router, useValue: routerSpyObj },
        { provide: UtilsService, useValue: utilsSpy },
      ],
    });

    // Obtener instancias de los mocks y del guard
    guard = TestBed.inject(AuthGuard);
    firebaseServiceSpy = TestBed.inject(FirebaseService) as jasmine.SpyObj<FirebaseService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    utilsServiceSpy = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
  });

  it('debe ser creado', () => {
    expect(guard).toBeTruthy();
  });

  it('Debería permitir el acceso si el usuario está autenticado.', async () => {
    // Mock de usuario autenticado con todas las propiedades necesarias
    const mockUser: User = {
      email: 'alguien@ejemplo.com',
      password: 'duocuc123',
      uid: 'fake-uid',        
      name: 'Juan Pérez',     
      img: 'fake-imgts-url' 
    };

    firebaseServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(mockUser)); // Usuario autenticado

    const canActivate = await guard.canActivate();
    expect(canActivate).toBeTrue(); // Debería permitir el acceso
    expect(routerSpy.navigate).not.toHaveBeenCalled(); // No debería navegar
  });

  it('Debe denegar el acceso y navegar a /auth si el usuario no está autenticado', async () => {
    firebaseServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(null)); // Usuario no autenticado

    const canActivate = await guard.canActivate();
    expect(canActivate).toBeFalse(); // Debería denegar el acceso
    expect(utilsServiceSpy.presentToast).toHaveBeenCalledWith({
      message: 'Debes iniciar sesión para acceder a esta página',
      duration: 2000,
      color: 'danger',
      position: 'bottom',
      icon: 'alert-circle-outline',
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']); // Debería navegar a /auth
  });
});
