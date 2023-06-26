import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderShowImageComponent } from './slider-show-image.component';

describe('SliderShowImageComponent', () => {
  let component: SliderShowImageComponent;
  let fixture: ComponentFixture<SliderShowImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderShowImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderShowImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
