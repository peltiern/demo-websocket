import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureNumberComponent } from './temperature-number.component';

describe('TemperatureNumberComponent', () => {
  let component: TemperatureNumberComponent;
  let fixture: ComponentFixture<TemperatureNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
