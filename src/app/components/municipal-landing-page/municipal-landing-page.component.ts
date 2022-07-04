import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {
  deleteCapitalInvestmentPlan,
  loadCapitalInvestmentPlans,
  updateCapitalInvestmentPlan
} from '../../../store/capital-investment-plan/capital-investment-plan.actions';
import {selectAllCapitalInvestmentPlans} from '../../../store/capital-investment-plan/capital-investment-plan.selectors';
import {CapitalInvestmentPlan, CIPAction, PlanState} from '../../../store/capital-investment-plan/capital-investment-plan.state';
import {loadContactInfo} from '../../../store/contact-info/contact-info.actions';
import {selectMunicipalContactInfo} from '../../../store/contact-info/contact-info.selectors';
import {ActivatedRoute} from '@angular/router';
import {
  AnnualExpenditureReport,
  ReportState
} from '../../../store/annual-expenditure-report/annual-expenditure-report.state';
import {selectAERs} from '../../../store/annual-expenditure-report/annual-expenditure-report.selectors';
import {
  loadAnnualExpenditureReportsForMunicipality,
  updateAnnualExpenditureReport
} from '../../../store/annual-expenditure-report/annual-expenditure-report.actions';
import {UiUtilsService} from '../../../services/ui-utils.service';

@Component({
  selector: 'app-municipal-landing-page',
  templateUrl: './municipal-landing-page.component.html',
  styleUrls: ['./municipal-landing-page.component.scss']
})
export class MunicipalLandingPageComponent implements OnInit {
  public plans: CapitalInvestmentPlan[] = [];
  public planColumns: string[] = ['projectName', 'projectNumber', 'projectVersion', 'amount', 'projectStatus', 'actions'];
  public reports: AnnualExpenditureReport[] = [];
  public reportColumns: string[] = ['fiscalYear', 'gasTaxExpenditures', 'unallocatedGasTaxAmount', 'reportState', 'actions'];
  public contactInfo;
  private municipalCode;

  private plans$;
  private reports$;
  private contactInfo$;

  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private uiUtils: UiUtilsService,
  ) { }

  ngOnInit() {
    this.municipalCode = this.route.snapshot.paramMap.get('municipalCode');

    this.store.dispatch(loadContactInfo({municipalCode: this.municipalCode}));
    this.store.dispatch(loadCapitalInvestmentPlans({municipalCode: this.municipalCode}));
    const now = this.uiUtils.getCurrentFiscalYear();
    const fiscalYears = [ now - 4, now - 3, now - 2, now - 1, now ];
    this.store.dispatch(loadAnnualExpenditureReportsForMunicipality({municipalCode: this.municipalCode, fiscalYears}));

    this.contactInfo$ = this.store.select(state => selectMunicipalContactInfo(state, {municipalCode: this.municipalCode}));
    this.contactInfo$.subscribe(contactInfo => this.contactInfo = contactInfo);

    this.plans$ = this.store.select(state => selectAllCapitalInvestmentPlans(state));
    this.plans$.subscribe(plans => {
      this.plans = plans;
    });

    this.reports$ = this.store.select(state => selectAERs(state));
    this.reports$.subscribe(reports => {
      this.reports = reports;
    });
  }

  getCIPStateText(stateCode: PlanState) {
    return this.uiUtils.getCIPStateText(stateCode);
  }

  getAERStateText(stateCode: ReportState) {
    return this.uiUtils.getAERStateText(stateCode);
  }

  submitCIP(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.SUBMITTED,
      }
    }));
  }

  deleteCIP(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(deleteCapitalInvestmentPlan({ capitalInvestmentPlan, filterResultsByMunicipality: true }));
  }

  recallCIP(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.DRAFT,
      }
    }));
  }

  undoCIPWithdrawal(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.APPROVED,
      }
    }));
  }

  completeProject(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.COMPLETED,
      }
    }));
  }

  requestProjectWithdrawal(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.WITHDRAWAL_REQUESTED,
      }
    }));
  }

  isPlanInDraft(plan: CapitalInvestmentPlan) {
    return this.uiUtils.isPlanInDraft(plan);
  }

  isPlanSubmitted(plan: CapitalInvestmentPlan) {
    return this.uiUtils.isPlanSubmitted(plan);
  }

  isPlanAmendable(plan: CapitalInvestmentPlan) {
    return this.uiUtils.isPlanAmendable(plan);
  }

  isPlanReadOnly(plan: CapitalInvestmentPlan) {
    return this.uiUtils.isPlanReadOnly(plan);
  }

  isPlanApproved(plan: CapitalInvestmentPlan) {
    return this.uiUtils.isPlanApproved(plan);
  }

  isPlanWithdrawalRequested(plan: CapitalInvestmentPlan) {
    return this.uiUtils.isPlanWithdrawalRequested(plan);
  }

  isReportInDraft(report: AnnualExpenditureReport) {
    return report.reportState === ReportState.DRAFT;
  }

  isReportSubmitted(report: AnnualExpenditureReport) {
    return report.reportState === ReportState.SUBMITTED;
  }

  submitAER(report: AnnualExpenditureReport) {
    this.store.dispatch(updateAnnualExpenditureReport({ annualExpenditureReport: {
        ...report,
        reportState: ReportState.SUBMITTED,
      }
    }));
  }

  recallAER(report: AnnualExpenditureReport) {
    this.store.dispatch(updateAnnualExpenditureReport({ annualExpenditureReport: {
        ...report,
        reportState: ReportState.DRAFT,
      }
    }));
  }

  getContactLink() {
    return ['/municipal', this.municipalCode, 'contact'];
  }

  private getCipLink(cipAction: string, projectNumber: string = null, version: number = null) {
    return (projectNumber === null)
      ? ['/municipal', this.municipalCode, 'cip', cipAction]
      : ['/municipal', this.municipalCode, 'cip', cipAction, projectNumber, version];
  }

  getNewCipLink() {
    return this.getCipLink(CIPAction.NEW);
  }

  getEditCipLink(plan: CapitalInvestmentPlan) {
    return this.getCipLink(CIPAction.EDIT, plan.projectNumber, plan.version);
  }

  getViewCipLink(plan: CapitalInvestmentPlan) {
    return this.getCipLink(CIPAction.VIEW, plan.projectNumber, plan.version);
  }

  getAmendCipLink(plan: CapitalInvestmentPlan) {
    return this.getCipLink(CIPAction.AMEND, plan.projectNumber, plan.version);
  }

  getFiscalYearLabel(fiscalYear: number) {
    return this.uiUtils.getFiscalYearLabel(fiscalYear);
  }

  getCostBreakdownTotalEligibleCosts(plan) {
    return plan ? this.uiUtils.getCostBreakdownTotalEligibleCosts(plan.costBreakdown) : 0;
  }

  getGasTaxExpenditures(report: AnnualExpenditureReport) {
    let allocatedTotal = 0;
    for (const plan of report.capitalInvestmentPlans) {
      const targetYear = plan.gasTaxExpenditureTimeline.find(entry => entry.year === report.fiscalYear);
      if (targetYear) {
        allocatedTotal += targetYear.plannedAmount;
      }
    }
    return allocatedTotal;
  }

  getUnallocatedGasTaxAmount(report: AnnualExpenditureReport) {
    let unallocatedTotal = report.allocationReceived;
    for (const plan of report.capitalInvestmentPlans) {
      const targetYear = plan.gasTaxExpenditureTimeline.find(entry => entry.year === report.fiscalYear);
      if (targetYear) {
        unallocatedTotal -= targetYear.plannedAmount;
      }
    }
    return unallocatedTotal;
  }

  getAerLink(actionType: string, fiscalYear: number) {
    return ['/municipal', this.municipalCode, 'aer', actionType, fiscalYear];
  }

  getViewAerLink(fiscalYear: number) {
    return this.getAerLink('view', fiscalYear);
  }

  getEditAerLink(fiscalYear: number) {
    return this.getAerLink('edit', fiscalYear);
  }

  printPage() {
    window.print();
  }

  isCurrentFiscalYear(fiscalYear: any) {
    return fiscalYear === this.uiUtils.getCurrentFiscalYear();
  }
}
