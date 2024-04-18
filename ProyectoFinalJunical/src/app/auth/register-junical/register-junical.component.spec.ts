import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterJunicalComponent } from './register-junical.component';

describe('RegisterJunicalComponent', () => {
  let component: RegisterJunicalComponent;
  let fixture: ComponentFixture<RegisterJunicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterJunicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterJunicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
