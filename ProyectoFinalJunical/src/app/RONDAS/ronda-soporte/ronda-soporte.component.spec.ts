import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RondaSoporteComponent } from './ronda-soporte.component';

describe('RondaSoporteComponent', () => {
  let component: RondaSoporteComponent;
  let fixture: ComponentFixture<RondaSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RondaSoporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RondaSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
