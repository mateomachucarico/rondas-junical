import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaJunicalComponent } from './categoria-junical.component';

describe('CategoriaJunicalComponent', () => {
  let component: CategoriaJunicalComponent;
  let fixture: ComponentFixture<CategoriaJunicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaJunicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaJunicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
