import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GacetaMarcoNormativoComponent } from './gaceta-marco-normativo.component';

describe('GacetaMarcoNormativoComponent', () => {
  let component: GacetaMarcoNormativoComponent;
  let fixture: ComponentFixture<GacetaMarcoNormativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GacetaMarcoNormativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GacetaMarcoNormativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
