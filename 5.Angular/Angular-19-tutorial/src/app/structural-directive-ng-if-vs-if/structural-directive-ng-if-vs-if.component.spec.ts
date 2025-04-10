import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralDirectiveNgIfVsIfComponent } from './structural-directive-ng-if-vs-if.component';

describe('StructuralDirectiveNgIfVsIfComponent', () => {
  let component: StructuralDirectiveNgIfVsIfComponent;
  let fixture: ComponentFixture<StructuralDirectiveNgIfVsIfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructuralDirectiveNgIfVsIfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructuralDirectiveNgIfVsIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
