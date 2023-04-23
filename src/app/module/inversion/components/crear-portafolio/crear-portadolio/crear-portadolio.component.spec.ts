import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPortadolioComponent } from './crear-portadolio.component';

describe('CrearPortadolioComponent', () => {
  let component: CrearPortadolioComponent;
  let fixture: ComponentFixture<CrearPortadolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPortadolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPortadolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
