import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;

  beforeEach(() => {
    const utilsSpy = jasmine.createSpyObj('UtilsService', ['startScan', 'presentToast']);
    const firebaseSpy = jasmine.createSpyObj('FirebaseService', ['agregarAsistencia']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: UtilsService, useValue: utilsSpy },
        { provide: FirebaseService, useValue: firebaseSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    utilsServiceSpy = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
    firebaseServiceSpy = TestBed.inject(FirebaseService) as jasmine.SpyObj<FirebaseService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería escanear el QR y agregar asistencia correctamente', async () => {
 
    const mockScanResult = 'codigo-qr-valido';
    const mockAsistencia = { seccion:'ingles' , nombre: 'Asistencia Mock' }; // Cambia según tu modelo
    utilsServiceSpy.startScan.and.returnValue(Promise.resolve(mockScanResult));
    spyOn(component, 'procesarScanResult').and.returnValue(mockAsistencia);
    firebaseServiceSpy.agregarAsistencia.and.returnValue(Promise.resolve());

    await component.scanQRCode();

    expect(utilsServiceSpy.startScan).toHaveBeenCalled();
    expect(component.procesarScanResult).toHaveBeenCalledWith(mockScanResult);
    expect(firebaseServiceSpy.agregarAsistencia).toHaveBeenCalledWith(mockAsistencia);
    expect(utilsServiceSpy.presentToast).toHaveBeenCalledWith({
      message: 'Asistencia agregada con éxito',
      duration: 2000,
      color: 'success',
      position: 'bottom',
      icon: 'checkmark-circle-outline',
    });
  });
});