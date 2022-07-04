import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalInvestmentPlanViewComponent } from './capital-investment-plan-view.component';

describe('CapitalInvestmentPlanEditComponent', () => {
  let component: CapitalInvestmentPlanViewComponent;
  let fixture: ComponentFixture<CapitalInvestmentPlanViewComponent>;

  beforeEach(async(() => {
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
