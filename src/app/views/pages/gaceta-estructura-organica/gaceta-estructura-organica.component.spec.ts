import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GacetaEstructuraOrganicaComponent } from './gaceta-estructura-organica.component';

describe('GacetaEstructuraOrganicaComponent', () => {
  let component: GacetaEstructuraOrganicaComponent;
  let fixture: ComponentFixture<GacetaEstructuraOrganicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GacetaEstructuraOrganicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GacetaEstructuraOrganicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
