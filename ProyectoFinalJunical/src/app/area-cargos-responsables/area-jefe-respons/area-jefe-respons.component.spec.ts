import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaJefeResponsComponent } from './area-jefe-respons.component';

describe('AreaJefeResponsComponent', () => {
  let component: AreaJefeResponsComponent;
  let fixture: ComponentFixture<AreaJefeResponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaJefeResponsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaJefeResponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
