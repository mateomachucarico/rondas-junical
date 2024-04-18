import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCargoComponent } from './crear-cargo.component';

describe('CrearCargoComponent', () => {
  let component: CrearCargoComponent;
  let fixture: ComponentFixture<CrearCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCargoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
