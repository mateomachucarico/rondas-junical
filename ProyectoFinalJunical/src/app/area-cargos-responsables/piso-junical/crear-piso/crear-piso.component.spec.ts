import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPisoComponent } from './crear-piso.component';

describe('CrearPisoComponent', () => {
  let component: CrearPisoComponent;
  let fixture: ComponentFixture<CrearPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
