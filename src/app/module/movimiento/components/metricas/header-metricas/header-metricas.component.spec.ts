import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMetricasComponent } from './header-metricas.component';

describe('HeaderMetricasComponent', () => {
  let component: HeaderMetricasComponent;
  let fixture: ComponentFixture<HeaderMetricasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMetricasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMetricasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
