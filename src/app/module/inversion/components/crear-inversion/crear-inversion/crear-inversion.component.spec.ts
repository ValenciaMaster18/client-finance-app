import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInversionComponent } from './crear-inversion.component';

describe('CrearInversionComponent', () => {
  let component: CrearInversionComponent;
  let fixture: ComponentFixture<CrearInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
