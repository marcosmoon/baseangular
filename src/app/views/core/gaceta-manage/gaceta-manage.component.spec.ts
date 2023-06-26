import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GacetaManageComponent } from './gaceta-manage.component';

describe('GacetaManageComponent', () => {
  let component: GacetaManageComponent;
  let fixture: ComponentFixture<GacetaManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GacetaManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GacetaManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
