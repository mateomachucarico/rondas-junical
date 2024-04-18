import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorresJunicalComponent } from './torres-junical.component';

describe('TorresJunicalComponent', () => {
  let component: TorresJunicalComponent;
  let fixture: ComponentFixture<TorresJunicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorresJunicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TorresJunicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
