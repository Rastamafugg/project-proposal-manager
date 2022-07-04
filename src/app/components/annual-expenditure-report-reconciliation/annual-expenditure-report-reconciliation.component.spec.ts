import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualExpenditureReportReconciliationComponent } from './annual-expenditure-report-reconciliation.component';

describe('AnnualExpenditureReportReconciliationComponent', () => {
  let component: AnnualExpenditureReportReconciliationComponent;
  let fixture: ComponentFixture<AnnualExpenditureReportReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualExpenditureReportReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualExpenditureReportReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
