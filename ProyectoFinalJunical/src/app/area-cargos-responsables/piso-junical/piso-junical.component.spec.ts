import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PisoJunicalComponent } from './piso-junical.component';

describe('PisoJunicalComponent', () => {
  let component: PisoJunicalComponent;
  let fixture: ComponentFixture<PisoJunicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PisoJunicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PisoJunicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
