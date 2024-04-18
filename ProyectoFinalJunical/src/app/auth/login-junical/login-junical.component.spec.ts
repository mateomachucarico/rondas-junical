import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginJunicalComponent } from './login-junical.component';

describe('LoginJunicalComponent', () => {
  let component: LoginJunicalComponent;
  let fixture: ComponentFixture<LoginJunicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginJunicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginJunicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
