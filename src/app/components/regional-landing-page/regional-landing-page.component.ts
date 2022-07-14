import {Component, OnInit} from '@angular/core';
import {CapitalInvestmentPlan, PlanState} from '../../../store/capital-investment-plan/capital-investment-plan.state';
import {
  loadAllCapitalInvestmentPlans,
  updateCapitalInvestmentPlan
} from '../../../store/capital-investment-plan/capital-investment-plan.actions';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {selectAllCapitalInvestmentPlans} from '../../../store/capital-investment-plan/capital-investment-plan.selectors';
import {Municipality} from '../../../store/static-data/static-data.state';
import {loadMunicipalities} from '../../../store/static-data/static-data.actions';
import {selectMunicipalities} from '../../../store/static-data/static-data.selectors';
import {
  AnnualExpenditureReport,
  ReportAction, ReportState
} from '../../../store/annual-expenditure-report/annual-expenditure-report.state';
import {loadAnnualExpenditureReportsForFiscalYear} from '../../../store/annual-expenditure-report/annual-expenditure-report.actions';
import {selectAERData} from '../../../store/annual-expenditure-report/annual-expenditure-report.selectors';
import {UiUtilsService} from '../../../services/ui-utils.service';
import {selectMunicipalAllocations} from '../../../store/municipal-allocations/municipal-allocations.selectors';
import {loadMunicipalAllocations} from '../../../store/municipal-allocations/municipal-allocations.actions';
import {MunicipalAllocations} from '../../../store/municipal-allocations/municipal-allocations.state';
import moment from 'moment';

@Component({
  selector: 'app-regional-landing-page',
  templateUrl: './regional-landing-page.component.html',
  styleUrls: ['./regional-landing-page.component.scss']
})
export class RegionalLandingPageComponent implements OnInit {
  public plans: CapitalInvestmentPlan[] = [];
  public municipalities: Municipality[] = [];
  public annualExpenditureReportColumns: string[] = [
    'municipality',
    'amountAllocated',
    'interestEarned',
    'overUnderCommittedFunds',
    'reportState',
    'lastActionTaken',
    'dateOfAction',
    'description',
  ];
  public annualExpenditureReports: AnnualExpenditureReport[] = [];
  public planColumns: string[] = ['municipality', 'projectName', 'amount', 'projectStatus', 'actions'];
  public allocationTableColumns: string[];
  public municipalAllocations: MunicipalAllocations[] = [];
  public municipalAllocationsList = [];

  private plans$;
  private municipalities$;
  private annualExpenditureReports$;
  private municipalAllocations$;

  constructor(
    private store: Store<ApplicationState>,
    private uiUtils: UiUtilsService,
  ) { }

  ngOnInit() {
    this.store.dispatch(loadMunicipalities());
    this.municipalities$ = this.store.select(state => selectMunicipalities(state));
    this.municipalities$.subscribe(municipalities => this.municipalities = municipalities);

    this.store.dispatch(loadAllCapitalInvestmentPlans());
    this.plans$ = this.store.select(state => selectAllCapitalInvestmentPlans(state));
    this.plans$.subscribe(plans => {
      this.plans = plans;
    });

    this.store.dispatch(loadAnnualExpenditureReportsForFiscalYear({fiscalYear: this.uiUtils.getCurrentFiscalYear()}));
    this.annualExpenditureReports$ = this.store.select(state => selectAERData(state));
    this.annualExpenditureReports$.subscribe(action => {
      this.annualExpenditureReports = action.aers;
    });

    this.store.dispatch(loadMunicipalAllocations());
    this.municipalAllocations$ = this.store.select(state => selectMunicipalAllocations(state));
    this.municipalAllocations$.subscribe(municipalAllocations => {
      this.municipalAllocations = municipalAllocations;
      this.municipalAllocationsList = [];
      this.allocationTableColumns = ['municipality'];
      for (const allocation of this.municipalAllocations) {
        this.allocationTableColumns.push(String(allocation.fiscalYear));

        for (const allocationData of allocation.allocations) {
          let targetRow = this.municipalAllocationsList.find(currentRow => currentRow.municipalCode === allocationData.municipality.code);
          if (!targetRow) {
            targetRow = {
              municipalCode: allocationData.municipality.code,
              municipalLabel: allocationData.municipality.label,
            };
            this.municipalAllocationsList.push(targetRow);
          }
          targetRow[String(allocation.fiscalYear)] = allocationData.amount;
        }
      }
    });
  }

  getActivePlans() {
    return (this.plans) ? this.plans.filter(currentPlan =>
      (currentPlan.state !== PlanState.COMPLETED
      && currentPlan.state !== PlanState.REJECTED)
    ) : [];
  }

  getCompletedPlans() {
    return (this.plans) ? this.plans.filter(currentPlan => currentPlan.state === PlanState.COMPLETED) : [];
  }

  getWithdrawnPlans() {
    return (this.plans) ? this.plans.filter(currentPlan => currentPlan.state === PlanState.WITHDRAWN) : [];
  }

  getRejectedPlans() {
    return (this.plans) ? this.plans.filter(currentPlan => currentPlan.state === PlanState.REJECTED) : [];
  }

  getMunicipalityName(municipalCode: string) {
    let municipalName = '';
    if (this.municipalities) {
      const targetMunicipality = this.municipalities.find(current => current.code === municipalCode);
      if (targetMunicipality) {
        municipalName = targetMunicipality.label;
      }
    }
    return municipalName;
  }

  getCIPStateText(stateCode) {
    return this.uiUtils.getCIPStateText(stateCode);
  }

  getAERStateText(stateCode: ReportState) {
    return this.uiUtils.getAERStateText(stateCode);
  }

  getCurrentFiscalYear() {
    return this.uiUtils.getCurrentFiscalYear();
  }

  getFiscalYearLabel(fiscalYear: any) {
    if (typeof fiscalYear === 'string') {
      fiscalYear = parseInt(fiscalYear, 10);
    }
    return this.uiUtils.getFiscalYearLabel(fiscalYear);
  }

  getCostBreakdownTotalEligibleCosts(plan) {
    return plan ? this.uiUtils.getCostBreakdownTotalEligibleCosts(plan.costBreakdown) : 0;
  }

  approveCIP(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.APPROVED,
      }
    }));
    this.store.dispatch(loadAllCapitalInvestmentPlans());
  }

  rejectCIP(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.REJECTED,
      }
    }));
    this.store.dispatch(loadAllCapitalInvestmentPlans());
  }

  undoCIPApproveOrDeny(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.SUBMITTED,
      }
    }));
    this.store.dispatch(loadAllCapitalInvestmentPlans());
  }

  approveWithdrawal(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.WITHDRAWN,
      }
    }));
    this.store.dispatch(loadAllCapitalInvestmentPlans());
  }

  undoWithdrawal(capitalInvestmentPlan: CapitalInvestmentPlan) {
    this.store.dispatch(updateCapitalInvestmentPlan({ capitalInvestmentPlan: {
        ...capitalInvestmentPlan,
        state: PlanState.WITHDRAWAL_REQUESTED,
      }
    }));
    this.store.dispatch(loadAllCapitalInvestmentPlans());
  }

  getCipLink(plan: CapitalInvestmentPlan) {
    return ['/regional', 'cip', 'edit', plan.municipalCode, plan.projectNumber, plan.version];
  }

  getAerLink(municipalCode: string, fiscalYear: number) {
    return ['/regional', 'aer-reconciliation', municipalCode, fiscalYear];
  }

  getReportsLink(municipalCode: string) {
    return ['/regional', 'municipal-reports', municipalCode];
  }

  getUnallocatedGasTaxAmount(report: AnnualExpenditureReport) {
    const allocatedTotal = 0;
    return allocatedTotal;
  }

  isReadyToReview(plan: CapitalInvestmentPlan) {
    return plan.state === PlanState.SUBMITTED;
  }

  isDraft(plan: CapitalInvestmentPlan) {
    return plan.state === PlanState.DRAFT;
  }

  isWithdrawalRequested(plan: CapitalInvestmentPlan) {
    return plan.state === PlanState.WITHDRAWAL_REQUESTED;
  }

  canUndoApproveOrDeny(plan: CapitalInvestmentPlan) {
    return plan.state === PlanState.APPROVED || plan.state === PlanState.REJECTED;
  }

  getAllocatedGasTax(report: AnnualExpenditureReport) {
    return report.allocationReceived;
  }

  getInterestEarned(report: AnnualExpenditureReport) {
    return report.allocationInterest;
  }

  getLastActionTakenProperty(report: AnnualExpenditureReport, property: string) {
    let latestAction: ReportAction;
    for (const currentAction of report?.actions) {
      if (!latestAction || moment(latestAction.date).isBefore(currentAction.date)
        || (moment(latestAction.date).isSame(currentAction.date) && latestAction.id < currentAction.id)) {
        latestAction = currentAction;
      }
    }
    return latestAction ? latestAction[property] : null;
  }

  printPage() {
    window.print();
  }
}
