import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { UtilsService } from 'src/app/services/utils.service';  // Asegúrate de importar el servicio si es necesario
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-employee/update-employee.component';

describe('UpdateEmployeeComponent', () => {
  let component: UpdateEmployeeComponent;
  let fixture: ComponentFixture<UpdateEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeComponent ],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp({
          apiKey: 'fake-api-key',
          authDomain: 'fake-auth-domain',
          projectId: 'fake-project-id',
          storageBucket: 'fake-storage-bucket',
          messagingSenderId: 'fake-messaging-sender-id',
          appId: 'fake-app-id',
        }),
        AngularFireAuthModule,  
        HttpClientModule,  
      ],
      providers: [FirebaseService, UtilsService],  
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ', () => {
    expect(component).toBeTruthy();
  });
});

