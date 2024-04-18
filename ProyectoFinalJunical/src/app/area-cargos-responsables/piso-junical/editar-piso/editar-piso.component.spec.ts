import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPisoComponent } from './editar-piso.component';

describe('EditarPisoComponent', () => {
  let component: EditarPisoComponent;
  let fixture: ComponentFixture<EditarPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
