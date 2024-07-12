import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrowaveSvgComponent } from './microwave-svg.component';

describe('MicrowaveSvgComponent', () => {
  let component: MicrowaveSvgComponent;
  let fixture: ComponentFixture<MicrowaveSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicrowaveSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicrowaveSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
