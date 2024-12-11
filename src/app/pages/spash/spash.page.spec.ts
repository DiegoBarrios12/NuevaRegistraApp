import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpashPage } from './spash.page';

describe('SpashPage', () => {
  let component: SpashPage;
  let fixture: ComponentFixture<SpashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
