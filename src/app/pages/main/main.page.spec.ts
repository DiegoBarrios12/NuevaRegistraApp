import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainPage } from './main.page';

import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';

describe('ProfilePage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainPage],
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
      ],
      providers: [FirebaseService],  
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
