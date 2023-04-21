import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorrosComponent } from './ahorro.component';

describe('AhorroComponent', () => {
  let component: AhorrosComponent;
  let fixture: ComponentFixture<AhorrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
