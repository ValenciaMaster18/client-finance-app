import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvDescargarComponent } from './csv-descargar.component';

describe('CsvDescargarComponent', () => {
  let component: CsvDescargarComponent;
  let fixture: ComponentFixture<CsvDescargarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvDescargarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvDescargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
