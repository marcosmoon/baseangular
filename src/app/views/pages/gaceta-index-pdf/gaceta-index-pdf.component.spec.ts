import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GacetaIndexPdfComponent } from './gaceta-index-pdf.component';

describe('GacetaIndexPdfComponent', () => {
  let component: GacetaIndexPdfComponent;
  let fixture: ComponentFixture<GacetaIndexPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GacetaIndexPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GacetaIndexPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
