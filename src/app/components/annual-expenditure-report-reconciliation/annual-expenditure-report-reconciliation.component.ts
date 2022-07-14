import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AnnualExpenditureReport,
  ReportState
} from '../../../store/annual-expenditure-report/annual-expenditure-report.state';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {UiUtilsService} from '../../../services/ui-utils.service';
import {
  loadAnnualExpenditureReportsForMunicipality,
  updateAnnualExpenditureReport
} from '../../../store/annual-expenditure-report/annual-expenditure-report.actions';
import {selectAERs} from '../../../store/annual-expenditure-report/annual-expenditure-report.selectors';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CodeType, Municipality} from '../../../store/static-data/static-data.state';
import {selectAERActionTypes, selectMunicipalities} from '../../../store/static-data/static-data.selectors';
import {loadAERActionTypes, loadMunicipalities} from '../../../store/static-data/static-data.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CapitalInvestmentPlan, CIPAction} from '../../../store/capital-investment-plan/capital-investment-plan.state';
import {MatTable} from '@angular/material/table';
import {UserFormComponent} from '../../directives/can-deactivate-guard/user-form-component';

@Component({
  selector: 'app-annual-expenditure-report-reconciliation',
  templateUrl: './annual-expenditure-report-reconciliation.component.html',
  styleUrls: ['./annual-expenditure-report-reconciliation.component.scss']
})
export class AnnualExpenditureReportReconciliationComponent extends UserFormComponent implements OnInit {
  public aerForm;
  public actionForm;
  public aer: AnnualExpenditureReport;
  private municipalCode: string;
  municipalities: Municipality[] = [];
  actionTypes: CodeType[] = [];
  actions = [];
  private fiscalYear: number;
  private showActionForm = false;
  public planColumns: string[] = ['projectName', 'projectNumber', 'projectVersion', 'plannedAmount', 'actualAmount', 'projectStatus', 'actions'];

  @ViewChild('capitalInvestmentPlans') capitalInvestmentPlansTable: MatTable<any>;

  projectActualAmountForm: FormGroup;
  showProjectActualAmountForm = false;

  private aers$;
  private municipalities$;
  private actionTypes$;

  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
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
      this.fiscalYear = parseInt(params.get('fiscalYear'), 0);
      this.store.dispatch(loadAnnualExpenditureReportsForMunicipality({
        municipalCode: this.municipalCode,
        fiscalYears: [this.fiscalYear],
      }));
    });

    this.store.dispatch(loadMunicipalities());
    this.municipalities$ = this.store.select(state => selectMunicipalities(state));
    this.municipalities$.subscribe(municipalities => this.municipalities = municipalities);

    this.store.dispatch(loadAERActionTypes());
    this.actionTypes$ = this.store.select(state => selectAERActionTypes(state));
    this.actionTypes$.subscribe(actionTypes => this.actionTypes = actionTypes);

    this.aers$ = this.store.select(state => selectAERs(state));
    this.aers$.subscribe(aers => {
      if (aers && aers.length === 1) {
        this.aer = aers[0];
        if (!this.aerForm) {
          this.initializeForm(this.aer);
        }
      }
    });
  }

  initializeForm(aer: AnnualExpenditureReport) {
    this.aerForm = this.uiUtils.createAnnualExpenditureReportForm(aer);

    this.actionForm = this.uiUtils.createReportActionForm();

    this.projectActualAmountForm = new FormGroup({
      projectTitle: new FormControl(null),
      projectNumber: new FormControl(null),
      version: new FormControl(null),
      plannedAmount: new FormControl(0),
      actualAmount: new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  getMunicipalityName() {
    return (this.municipalCode && this.municipalities && this.municipalities.length > 0)
      ? this.municipalities.find(current => current.code === this.municipalCode).label
      : '';
  }

  getFiscalYearLabel() {
    return this.uiUtils.getFiscalYearLabel(this.fiscalYear);
  }

  getReconciliationActions() {
    return this.aerForm.controls.actions.value;
  }

  newAction() {
    this.actionForm.reset();
    let actionId = 1;
    for (const currentAction of this.aerForm.controls.actions.value) {
      if (currentAction.id >= actionId) {
        actionId = currentAction.id + 1;
      }
    }
    this.actionForm.get('id').setValue(actionId);
    this.setActionFormVisibility(true);
  }

  editAction(action) {
    this.actionForm.get('id').setValue(action.id);
    this.actionForm.get('actionType').setValue(action.actionType);
    this.actionForm.get('date').setValue(action.date);
    this.actionForm.get('description').setValue(action.description);
    this.setActionFormVisibility(true);
  }

  saveAction() {
    const action = {
      ...this.actionForm.value,
    };
    const targetFormGroup = this.aerForm.controls.actions.controls.find(currentGroup => currentGroup.get('id').value === action.id);
    if (targetFormGroup) {
      targetFormGroup.get('actionType').setValue(action.actionType);
      targetFormGroup.get('date').setValue(action.date);
      targetFormGroup.get('description').setValue(action.description);
    } else {
      this.aerForm.controls.actions.push(this.fb.group({
        id: this.fb.control(action.id),
        actionType: this.fb.control(action.actionType),
        date: this.fb.control(action.date),
        description: this.fb.control(action.description),
      }));
    }
    this.actionForm.reset();
    this.setActionFormVisibility(false);
  }

  cancelAction() {
    this.actionForm.reset();
    this.setActionFormVisibility(false);
  }

  setActionFormVisibility(value: boolean) {
    this.showActionForm = value;
  }

  getActionFormClasses() {
    return this.showActionForm ? 'action-form full-width' : 'action-form full-width hidden';
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
      ? ['/regional', 'cip', cipAction, this.municipalCode]
      : ['/regional', 'cip', cipAction, this.municipalCode, projectNumber, version];
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

  submitAER() {
    const aer: AnnualExpenditureReport = {
      ...this.aerForm.value,
    };
    this.store.dispatch(updateAnnualExpenditureReport({annualExpenditureReport: aer}));
    this.snackbar.open('Save Success', null, {
      duration: 2000
    });
    this.aerForm.reset();
    this.goToPreviousPage();
  }

  approveAER() {
    const aer: AnnualExpenditureReport = {
      ...this.aerForm.value,
      reportState: ReportState.APPROVED,
      capitalInvestmentPlans: this.aer.capitalInvestmentPlans,
    };
    this.store.dispatch(updateAnnualExpenditureReport({annualExpenditureReport: aer}));
  }

  rejectAER() {
    const aer: AnnualExpenditureReport = {
      ...this.aerForm.value,
      reportState: ReportState.DRAFT,
      capitalInvestmentPlans: this.aer.capitalInvestmentPlans,
    };
    this.store.dispatch(updateAnnualExpenditureReport({annualExpenditureReport: aer}));
  }

  isReportSubmitted(aer: AnnualExpenditureReport) {
    return aer.reportState === ReportState.SUBMITTED;
  }

  isReportApproved(aer: AnnualExpenditureReport) {
    return aer.reportState === ReportState.APPROVED;
  }

  goToPreviousPage() {
    this.location.back();
  }

  printPage() {
    window.print();
  }

  isEditable() {
    return this.isReportApproved(this.aerForm.value);
  }
}
