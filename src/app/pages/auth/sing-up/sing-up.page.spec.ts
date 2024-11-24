import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingUpPage } from './sing-up.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service'; // Si se usa UtilsService
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

describe('SingUpPage', () => {
  let component: SingUpPage;
  let fixture: ComponentFixture<SingUpPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingUpPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientModule, 
        AngularFireModule.initializeApp({
          apiKey: 'fake-api-key',
          authDomain: 'fake-auth-domain',
          projectId: 'fake-project-id',
          storageBucket: 'fake-storage-bucket',
          messagingSenderId: 'fake-messaging-sender-id',
          appId: 'fake-app-id',
        }),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ],
      providers: [FirebaseService, UtilsService], // Agregar UtilsService si es necesario
    }).compileComponents();

    fixture = TestBed.createComponent(SingUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bd', () => {
    expect(component).toBeTruthy();
  });
});
