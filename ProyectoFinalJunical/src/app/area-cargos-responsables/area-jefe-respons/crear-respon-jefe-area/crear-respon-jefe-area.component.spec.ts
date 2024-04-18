import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearResponJefeAreaComponent } from './crear-respon-jefe-area.component';

describe('CrearResponJefeAreaComponent', () => {
  let component: CrearResponJefeAreaComponent;
  let fixture: ComponentFixture<CrearResponJefeAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearResponJefeAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearResponJefeAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
