import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRondaComponent } from './crear-ronda.component';

describe('CrearRondaComponent', () => {
  let component: CrearRondaComponent;
  let fixture: ComponentFixture<CrearRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRondaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
