import {Component, HostListener, OnChanges, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormControl, FormGroup} from '@angular/forms';
import {CapitalInvestmentPlan, CIPAction} from '../../../store/capital-investment-plan/capital-investment-plan.state';
import {ApplicationState} from '../../../store';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {
  loadAnnualExpenditureReport,
  updateAnnualExpenditureReport
} from '../../../store/annual-expenditure-report/annual-expenditure-report.actions';
import {Location} from '@angular/common';
import {selectAERs} from '../../../store/annual-expenditure-report/annual-expenditure-report.selectors';
import {AnnualExpenditureReport} from '../../../store/annual-expenditure-report/annual-expenditure-report.state';
import {UiUtilsService} from '../../../services/ui-utils.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTable} from '@angular/material/table';
import {UserFormComponent} from '../../directives/can-deactivate-guard/user-form-component';

@Component({
  selector: 'app-annual-expenditure-report',
  templateUrl: './annual-expenditure-report.component.html',
  styleUrls: ['./annual-expenditure-report.component.scss']
})
export class AnnualExpenditureReportComponent extends UserFormComponent implements OnInit, OnChanges {
  public aerForm;
  public aer: AnnualExpenditureReport;
  private municipalCode: string;
  private actionType: string;
  private fiscalYear: number;
  public planColumns: string[] = ['projectName', 'projectNumber', 'projectVersion', 'plannedAmount', 'actualAmount', 'projectStatus', 'actions'];

  @ViewChild('capitalInvestmentPlans') capitalInvestmentPlansTable: MatTable<any>;

  projectActualAmountForm: FormGroup;
  showProjectActualAmountForm = false;
  private aers$;

  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private location: Location,
    private uiUtils: UiUtilsService,
    private snackbar: MatSnackBar,
  ) {
    super();
  }

  hasUnsavedData() {
    return this.aerForm && this.aerForm.dirty;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.municipalCode = params.get('municipalCode');
      this.actionType = params.get('actionType');
      this.fiscalYear = parseInt(params.get('fiscalYear'), 0);
      this.store.dispatch(loadAnnualExpenditureReport({municipalCode: this.municipalCode, fiscalYear: this.fiscalYear}));
    });
    this.aers$ = this.store.select(state => selectAERs(state));
    this.aers$.subscribe(aers => {
      if (aers && aers.length === 1) {
        this.aer = {
          ...aers[0],
          capitalInvestmentPlans: [
            ...aers[0].capitalInvestmentPlans,
          ]
        };
        if (!this.aerForm) {
          this.initializeForm(this.aer);
        }
      }
    });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes.aer && changes.aer.isFirstChange()) {
    }
  }

  initializeForm(aer: AnnualExpenditureReport) {
    this.aerForm = this.uiUtils.createAnnualExpenditureReportForm(aer);

    this.projectActualAmountForm = new FormGroup({
      projectTitle: new FormControl(null),
      projectNumber: new FormControl(null),
      version: new FormControl(null),
      plannedAmount: new FormControl(0),
      actualAmount: new FormControl(0),
    });
  }

  getFiscalYearLabel() {
    return this.aer ? this.uiUtils.getFiscalYearLabel(this.aer.fiscalYear) : '';
  }

  getStateText(stateCode) {
    return this.uiUtils.getCIPStateText(stateCode);
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

  submitForm() {
    this.store.dispatch(updateAnnualExpenditureReport({annualExpenditureReport: this.aerForm.value}));
    this.snackbar.open('Save Success', null, {
      duration: 2000
    });
    this.aerForm.reset();
    this.goToPreviousPage();
  }

  getPlannedAllocatedGasTaxFunds(plan: CapitalInvestmentPlan) {
    return plan.gasTaxExpenditureTimeline.find(entry => entry.year === this.aer.fiscalYear).plannedAmount;
  }

  getActualAllocatedGasTaxFunds(plan: CapitalInvestmentPlan) {
    return plan.gasTaxExpenditureTimeline.find(entry => entry.year === this.aer.fiscalYear).actualAmount;
  }

  getPlannedTotalAllocatedGasTaxFunds() {
    let total = 0;
    if (this.aerForm) {
      for (const plan of this.aerForm.value.capitalInvestmentPlans) {
        total += this.getPlannedAllocatedGasTaxFunds(plan);
      }
    }
    return total;
  }

  getActualTotalAllocatedGasTaxFunds() {
    let total = 0;
    if (this.aerForm) {
      for (const plan of this.aerForm.value.capitalInvestmentPlans) {
        total += this.getActualAllocatedGasTaxFunds(plan);
      }
    }
    return total;
  }

  getPlannedOverUnderCommittedGasTaxFunds() {
    let total = this.aer.allocationReceived;
    if (this.aerForm) {
      for (const plan of this.aerForm.value.capitalInvestmentPlans) {
        total -= this.getPlannedAllocatedGasTaxFunds(plan);
      }
    }
    return total;
  }

  getActualOverUnderCommittedGasTaxFunds() {
    let total = this.aer.allocationReceived;
    if (this.aerForm) {
      for (const plan of this.aerForm.value.capitalInvestmentPlans) {
        total -= this.getActualAllocatedGasTaxFunds(plan);
      }
    }
    return total;
  }

  getProjectActualAmountFormClasses() {
    return this.showProjectActualAmountForm ? 'project-actual-amount-form full-width' : 'project-actual-amount-form full-width hidden';
  }

  editProjectActualAmount(plan: CapitalInvestmentPlan) {
    this.projectActualAmountForm.get('projectTitle').setValue(plan.projectTitle);
    this.projectActualAmountForm.get('projectNumber').setValue(plan.projectNumber);
    this.projectActualAmountForm.get('version').setValue(plan.version);
    const entry = plan.gasTaxExpenditureTimeline.find(current => current.year === this.fiscalYear);
    if (entry) {
      this.projectActualAmountForm.get('plannedAmount').setValue(entry.plannedAmount);
      this.projectActualAmountForm.get('actualAmount').setValue(entry.actualAmount);
    }
    this.showProjectActualAmountForm = true;
  }

  saveProjectActualAmount() {
    const result = this.projectActualAmountForm.value;
    const targetCIPForm = this.aerForm.get('capitalInvestmentPlans').controls.find(
      current => current.value.projectNumber === result.projectNumber && current.value.version === result.version);
    const targetTimelineForm = targetCIPForm.get('gasTaxExpenditureTimeline').controls.find(
      current => current.value.year === this.fiscalYear);
    targetTimelineForm.get('actualAmount').setValue(result.actualAmount);
    this.capitalInvestmentPlansTable.renderRows();
    this.projectActualAmountForm.reset();
    this.showProjectActualAmountForm = false;
  }

  cancelProjectActualAmount() {
    this.projectActualAmountForm.reset();
    this.showProjectActualAmountForm = false;
  }

  private getCipLink(cipAction: string, projectNumber: string = null, version: number = null) {
    return (projectNumber === null)
      ? ['/municipal', this.municipalCode, 'cip', cipAction]
      : ['/municipal', this.municipalCode, 'cip', cipAction, projectNumber, version];
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

  goToPreviousPage() {
    this.location.back();
  }

  printPage() {
    window.print();
  }

  isEditable() {
    return this.actionType === 'edit';
  }
}
