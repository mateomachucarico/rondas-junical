import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaJunicalComponent } from './zona-junical.component';

describe('ZonaJunicalComponent', () => {
  let component: ZonaJunicalComponent;
  let fixture: ComponentFixture<ZonaJunicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaJunicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZonaJunicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
