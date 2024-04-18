import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargResponsComponent } from './carg-respons.component';

describe('CargResponsComponent', () => {
  let component: CargResponsComponent;
  let fixture: ComponentFixture<CargResponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargResponsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargResponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
