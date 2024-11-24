import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ForgotPasswordPage } from './forgot-password.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { FirebaseService } from 'src/app/services/firebase.service'; 

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  
  const mockFirebaseService = {
    resetPassword: jasmine.createSpy('resetPassword').and.returnValue(
      Promise.resolve('Email enviado')
    ),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordPage],
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
        HttpClientTestingModule, 
      ],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('se deberia creats', () => {
    expect(component).toBeTruthy();
  });
});
