import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UpdateEmployeeComponent } from './update-employee.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';  // Importar HttpClientModule
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

describe('UpdateEmployeeComponent', () => {
  let component: UpdateEmployeeComponent;
  let fixture: ComponentFixture<UpdateEmployeeComponent>;

  beforeEach(waitForAsync(() => {
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
        AngularFirestoreModule, 
        HttpClientModule,        
      ],
      providers: [FirebaseService], 
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should createrrd', () => {
    expect(component).toBeTruthy();
  });
});

