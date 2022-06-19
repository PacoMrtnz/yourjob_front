import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AterrizajeComponent } from './aterrizaje.component';

describe('AterrizajeComponent', () => {
  let component: AterrizajeComponent;
  let fixture: ComponentFixture<AterrizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AterrizajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AterrizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
