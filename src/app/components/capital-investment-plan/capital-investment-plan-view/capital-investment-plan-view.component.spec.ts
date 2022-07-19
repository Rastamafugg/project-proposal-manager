import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CapitalInvestmentPlanViewComponent } from './capital-investment-plan-view.component';

describe('CapitalInvestmentPlanEditComponent', () => {
  let component: CapitalInvestmentPlanViewComponent;
  let fixture: ComponentFixture<CapitalInvestmentPlanViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalInvestmentPlanViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalInvestmentPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
