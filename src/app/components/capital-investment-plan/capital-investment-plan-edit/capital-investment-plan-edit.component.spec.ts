import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CapitalInvestmentPlanEditComponent } from './capital-investment-plan-edit.component';

describe('CapitalInvestmentPlanEditComponent', () => {
  let component: CapitalInvestmentPlanEditComponent;
  let fixture: ComponentFixture<CapitalInvestmentPlanEditComponent>;

  beforeEach(waitForAsync(() => {
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
