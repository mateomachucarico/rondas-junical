import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaResponsComponent } from './area-respons.component';

describe('AreaResponsComponent', () => {
  let component: AreaResponsComponent;
  let fixture: ComponentFixture<AreaResponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaResponsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaResponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
