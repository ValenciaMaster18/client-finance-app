import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAhorroComponent } from './crear-ahorro.component';

describe('CrearAhorroComponent', () => {
  let component: CrearAhorroComponent;
  let fixture: ComponentFixture<CrearAhorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAhorroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
