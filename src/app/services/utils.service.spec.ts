import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilsService } from './utils.service';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { Asistencia } from '../models/asistencia';
import { UserCredential } from 'firebase/auth';


describe('FirebaseService', () => {
  let service: FirebaseService;
  let authSpy: jasmine.SpyObj<AngularFireAuth>;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('AngularFireAuth', ['currentUser']);
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'createId']);
    utilsServiceSpy = jasmine.createSpyObj('UtilsService', ['routerlink', 'presentToast']);
    const mockAsistencias: Asistencia[] = [
      { estudiante: 'Ana', estado: 'Presente', fecha: '2024-11-23' },
      { estudiante: 'Luis', estado: 'Ausente', fecha: '2024-11-22' },
    ];
    firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    firestoreSpy.collection.and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(mockAsistencias)),
    } as any);
    
    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: AngularFireAuth, useValue: authSpy },
        { provide: AngularFirestore, useValue: firestoreSpy },
        { provide: UtilsService, useValue: utilsServiceSpy },
      ],
    });

   
    service = TestBed.inject(FirebaseService);
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('Métodos de autenticación', () => {
    it('debería obtener el usuario actual', async () => {
      const mockUser = { uid: '123', email: 'test@example.com' };
      authSpy.currentUser = Promise.resolve(mockUser as any);

      const user = await service.getCurrentUser();
      expect(user).toEqual({ uid: '123', email: 'test@example.com' } as User);
    });
    it('debería iniciar sesión con credenciales válidas', async () => {
      const mockUser: User = { email: 'test@example.com', password: '123456' } as User;
      const mockUserCredential = {
        user: {
          uid: '123',
          email: 'test@example.com',
        },
      } as UserCredential;
    
      spyOn(service, 'signIn').and.returnValue(Promise.resolve(mockUserCredential));
    
      const result = await service.signIn(mockUser);
      expect(result).toEqual(mockUserCredential);
    });
    
    it('debería obtener asistencias', (done) => {
      const mockAsistencias: Asistencia[] = [
        { estudiante: 'Ana', estado: 'Presente', fecha: '2024-11-23' },
        { estudiante: 'Luis', estado: 'Ausente', fecha: '2024-11-22' },
      ];
  
      service.obtenerAsistencias().subscribe((asistencias) => {
        expect(asistencias).toEqual(mockAsistencias);
        done();
      });
    });

  describe('Métodos de almacenamiento', () => {
    it('debería actualizar una imagen y obtener la URL', async () => {
      const uploadSpy = spyOn(service, 'updateImg').and.returnValue(Promise.resolve('https://example.com/image.png'));

      const url = await service.updateImg('path/to/image', 'data_url');
      expect(uploadSpy).toHaveBeenCalledWith('path/to/image', 'data_url');
      expect(url).toBe('https://example.com/image.png');
    });
  });
});
});