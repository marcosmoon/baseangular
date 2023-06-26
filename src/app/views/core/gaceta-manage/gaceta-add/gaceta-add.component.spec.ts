import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GacetaAddComponent } from './gaceta-add.component';

describe('GacetaAddComponent', () => {
  let component: GacetaAddComponent;
  let fixture: ComponentFixture<GacetaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GacetaAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GacetaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
