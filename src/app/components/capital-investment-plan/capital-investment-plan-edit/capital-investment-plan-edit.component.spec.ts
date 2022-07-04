import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalInvestmentPlanEditComponent } from './capital-investment-plan-edit.component';

describe('CapitalInvestmentPlanEditComponent', () => {
  let component: CapitalInvestmentPlanEditComponent;
  let fixture: ComponentFixture<CapitalInvestmentPlanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalInvestmentPlanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalInvestmentPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
