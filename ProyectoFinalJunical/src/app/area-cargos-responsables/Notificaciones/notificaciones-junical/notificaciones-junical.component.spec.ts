import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesJunicalComponent } from './notificaciones-junical.component';

describe('NotificacionesJunicalComponent', () => {
  let component: NotificacionesJunicalComponent;
  let fixture: ComponentFixture<NotificacionesJunicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesJunicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificacionesJunicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
