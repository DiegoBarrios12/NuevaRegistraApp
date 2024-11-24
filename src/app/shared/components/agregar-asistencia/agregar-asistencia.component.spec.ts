import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas de HttpClient
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AgregarAsistenciaComponent } from './agregar-asistencia.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

describe('AgregarAsistenciaComponent', () => {
  let component: AgregarAsistenciaComponent;
  let fixture: ComponentFixture<AgregarAsistenciaComponent>;

  // Mock de configuración de Firebase
  const firebaseConfigMock = {
    apiKey: 'fakeApiKey',
    authDomain: 'fakeAuthDomain',
    projectId: 'fakeProjectId',
    storageBucket: 'fakeStorageBucket',
    messagingSenderId: 'fakeMessagingSenderId',
    appId: 'fakeAppId',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAsistenciaComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule, // Incluye el módulo de pruebas para HttpClient
        AngularFireModule.initializeApp(firebaseConfigMock),
      ],
      providers: [
        FirebaseService, // Incluye el servicio que necesita HttpClient
        UtilsService, // También depende de HttpClient
        { provide: AngularFirestore, useValue: jasmine.createSpyObj('AngularFirestore', ['collection']) },
        { provide: AngularFireAuth, useValue: jasmine.createSpyObj('AngularFireAuth', ['authState']) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite componentes personalizados en la prueba
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should createeed', () => {
    expect(component).toBeTruthy();
  });
});

