import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';


const mockFirebaseService = {
  getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(Promise.resolve({ email: 'test@example.com' })),
};


const mockUtilsService = {
  presentToast: jasmine.createSpy('presentToast'),
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientModule, 
      ],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: UtilsService, useValue: mockUtilsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it(' sesupone create', () => {
    expect(component).toBeTruthy();
  });
});
