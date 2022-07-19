import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnnualExpenditureReportComponent } from './annual-expenditure-report.component';

describe('AnnualExpenditureReportComponent', () => {
  let component: AnnualExpenditureReportComponent;
  let fixture: ComponentFixture<AnnualExpenditureReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualExpenditureReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualExpenditureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
