import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearObjetivoComponent } from './crear-objetivo.component';

describe('CrearObjetivoComponent', () => {
  let component: CrearObjetivoComponent;
  let fixture: ComponentFixture<CrearObjetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearObjetivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
