import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosJunicalComponent } from './usuarios-junical.component';

describe('UsuariosJunicalComponent', () => {
  let component: UsuariosJunicalComponent;
  let fixture: ComponentFixture<UsuariosJunicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosJunicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosJunicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
