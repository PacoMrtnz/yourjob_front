import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllinscribedComponent } from './allinscribed.component';

describe('AllinscribedComponent', () => {
  let component: AllinscribedComponent;
  let fixture: ComponentFixture<AllinscribedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllinscribedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllinscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
