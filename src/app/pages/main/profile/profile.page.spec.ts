import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { FirebaseService } from 'src/app/services/firebase.service';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;


  const mockFirebaseService = {
    getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(
      Promise.resolve({ email: 'test@example.com' }) 
    ),
    
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePage],
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
        HttpClientTestingModule, 
      ],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('se creaira', () => {
    expect(component).toBeTruthy();
  });
});
