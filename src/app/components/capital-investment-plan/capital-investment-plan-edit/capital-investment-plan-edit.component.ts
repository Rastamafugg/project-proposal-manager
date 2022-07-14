import {Location} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MatTable} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {
  CapitalInvestmentPlan,
  FundingSource,
  GasTaxExpenditureTimelineEntry,
  GasTaxExpenditureTimelineTransfer, PlanState,
  ProjectActivity,
  ProjectTimelineEntry,
} from '../../../../store/capital-investment-plan/capital-investment-plan.state';
import {CodeType, ProjectObjective} from '../../../../store/static-data/static-data.state';
import {ApplicationState} from '../../../../store';
import {RestService} from '../../../../services/rest.service';
import {UiUtilsService} from '../../../../services/ui-utils.service';
import {ContactInfo} from '../../../../store/contact-info/contact-info.state';

@Component({
  selector: 'app-capital-investment-plan-edit',
  templateUrl: './capital-investment-plan-edit.component.html',
  styleUrls: ['./capital-investment-plan-edit.component.scss']
})
export class CapitalInvestmentPlanEditComponent implements OnInit, OnChanges {
  @Input() cip: CapitalInvestmentPlan;
  @Input() municipalContactInfo: ContactInfo;
  @Input() allMunicipalCips: CapitalInvestmentPlan[];
  @Input() isRegionalInterface: boolean;
  @Input() projectTypes: CodeType[] = [];
  @Input() activityTypes: CodeType[] = [];
  @Input() outcomesAndPlanningTypes: CodeType[] = [];
  @Input() fundingSourceTypes: CodeType[] = [];
  @Input() programRequirementsTypes: CodeType[] = [];
  @Input() projectTimelineActivityTypes: CodeType[] = [];
  @Input() categories: ProjectObjective[] = [];
  @Input() timelineRange;
  @Output() hasUnsavedData = new EventEmitter<boolean>();
  @Output() updatedCip = new EventEmitter<CapitalInvestmentPlan>();
  public selectedCategories: ProjectObjective[] = [];
  public fiscalYears: CodeType[] = [];
  public form;
  public projectActivityForm;
  public timelineItemForm;
  public timelineItemFormOriginalYear: number;
  public timelineTransferForm;
  public sourceOfFundingForm;
  public projectTimelineEntryForm;
  private showProjectActivityForm = false;
  private showTimelineItemForm = false;
  private showTimelineTransferForm = false;
  private showSourceOfFundingForm = false;
  private showProjectTimelineEntryForm = false;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild('costBreakdown') costBreakdownTable: MatTable<any>;
  @ViewChild('expenditureTimeline') expenditureTimelineTable: MatTable<any>;
  @ViewChild('sourcesOfFunding') sourcesOfFundingTable: MatTable<any>;
  @ViewChild('projectTimelines') projectTimelinesTable: MatTable<any>;

  activityTableColumns = ['description', 'amount', 'actions'];
  expenditureTimelineColumns = ['year', 'plannedAmount', 'actualAmount', 'actions'];
  fundingSourcesColumns = ['fundingSource', 'program', 'confirmed', 'amount', 'actions'];
  projectTimelinesColumns = ['activity', 'startDate', 'completionDate', 'actions'];

  get costBreakdownControls() {
    return (this.form && this.form.get('costBreakdown'))
      ? this.form.get('costBreakdown') as FormGroup
      : null;
  }

  get projectActivitiesControls() {
    return (this.form && this.form.get('costBreakdown'))
      ? this.form.get('costBreakdown') as FormArray
      : null;
  }

  get gasTaxExpenditureTimelineControls() {
    return (this.form && this.form.get('gasTaxExpenditureTimeline'))
      ? this.form.get('gasTaxExpenditureTimeline') as FormArray
      : null;
  }

  get proposedSourcesOfFundingControls() {
    return this.form ? this.form.get('proposedSourcesOfFunding') as FormArray : null;
  }

  get projectTimelinesControls() {
    return this.form ? this.form.get('projectTimelines') as FormArray : null;
  }

  get outcomesAndPlanningControls() {
    return this.form ? this.form.get('outcomesAndPlanning') as FormArray : null;
  }

  get indicatorControls() {
    return this.form ? this.form.get('scheduleHIndicators') as FormArray : null;
  }

  get requirementsControls() {
    return this.form ? this.form.get('programRequirements') as FormArray : null;
  }

  selectedFieldPath: string[] = [];

  constructor(
    private store: Store<ApplicationState>,
    private fb: FormBuilder,
    private restService: RestService,
    private uiUtils: UiUtilsService,
    private location: Location,
  ) {}

  ngOnInit() {
    if (!this.form) {
      this.initializeForm();
    }

    this.fiscalYears = this.uiUtils.getAllFiscalYears();
  }

  private initializeForm() {
    this.form = this.uiUtils.createCapitalInvestmentPlanForm();
    this.projectActivityForm = this.uiUtils.createProjectActivityForm();
    this.timelineItemForm = this.uiUtils.createExpenditureTimelineForm();
    this.timelineTransferForm = this.uiUtils.createExpenditureTimelineTransferForm();
    this.sourceOfFundingForm = this.uiUtils.createSourceOfFundingForm();
    this.projectTimelineEntryForm = this.uiUtils.createProjectTimelineForm();
    this.form.valueChanges.subscribe((value) => {
      this.hasUnsavedData.emit(this.form.dirty);
    });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // for (const propName in changes) {
    //   const changedProp = changes[propName];
    //   const to = JSON.stringify(changedProp.currentValue);
    //   if (changedProp.isFirstChange()) {
    //     console.log(`Initial value of ${propName} set to ${to}`);
    //   } else {
    //     const from = JSON.stringify(changedProp.previousValue);
    //     console.log(`${propName} changed from ${from} to ${to}`);
    //   }
    // }
    if (changes.cip && changes.cip.isFirstChange()) {
      if (!this.form) {
        this.initializeForm();
      }

      const cip = changes.cip.currentValue;
      if (cip) {
        this.initializeCapitalInvestmentPlanForm(cip, this.form);
      }
    }

    if (changes.municipalContactInfo && changes.municipalContactInfo.isFirstChange()) {
      if (!this.form) {
        this.initializeForm();
      }
      this.form.controls.municipalCode.setValue(changes.municipalContactInfo.currentValue.municipalCode);
      this.form.controls.projectMunicipality.setValue(changes.municipalContactInfo.currentValue.municipalName);
    }

    if (changes.outcomesAndPlanningTypes && changes.outcomesAndPlanningTypes.isFirstChange()) {
      if (!this.form) {
        this.initializeForm();
      }
      // if (!this.cip) {
      //   debugger;
      // }
      if (this.form.get('outcomesAndPlanning').controls.length === 0) {
        for (const outcome of changes.outcomesAndPlanningTypes.currentValue) {
          this.outcomesAndPlanningControls.push(this.uiUtils.createOutcomesForm({
            code: outcome.code,
            description: outcome.label,
            selected: false,
          }));
        }
      }
    }

    if (changes.programRequirementsTypes && changes.programRequirementsTypes.isFirstChange()) {
      if (!this.form) {
        this.initializeForm();
      }
      // if (!this.cip) {
      //   debugger;
      // }
      if (this.form.get('programRequirements').controls.length === 0) {
        for (const requirement of changes.programRequirementsTypes.currentValue) {
          this.requirementsControls.push(this.uiUtils.createRequirementForm({
            code: requirement.code,
            description: requirement.label,
            selected: false,
          }));
        }
      }
    }
  }

  private initializeCapitalInvestmentPlanForm(cip, form) {
    form.controls.municipalCode.setValue(cip.municipalCode);
    form.controls.projectTitle.setValue(cip.projectTitle);
    form.controls.projectNumber.setValue(cip.projectNumber);
    form.controls.version.setValue(cip.version);
    form.controls.state.setValue(cip.state);
    if (cip.scheduleHIndicators) {
      const selectedCodes = [];
      this.indicatorControls.clear();
      for (const indicator of cip.scheduleHIndicators) {
        selectedCodes.push(indicator.projectCategoryCode);
        this.indicatorControls.push(this.uiUtils.createIndicatorForm(indicator));
      }
      form.controls.projectCategories.setValue(selectedCodes);
    }
    form.controls.projectDescription.setValue(cip.projectDescription);
    form.controls.projectLocation.setValue(cip.projectLocation);
    form.controls.projectMunicipality.setValue(cip.projectMunicipality);
    form.controls.projectPostalCode.setValue(cip.projectPostalCode);
    form.controls.councilResolutionMailed.setValue(cip.councilResolutionMailed);
    form.controls.dateOfResolution.setValue(cip.dateOfResolution);
    form.controls.projectType.setValue(cip.projectType);
    if (cip.costBreakdown) {
      this.projectActivitiesControls.clear();
      for (const activity of cip.costBreakdown) {
        this.projectActivitiesControls.push(this.uiUtils.createProjectActivityForm(activity));
      }
    }
    if (cip.gasTaxExpenditureTimeline) {
      this.gasTaxExpenditureTimelineControls.clear();
      for (const timelineItem of cip.gasTaxExpenditureTimeline) {
        this.gasTaxExpenditureTimelineControls.push(this.uiUtils.createExpenditureTimelineForm(timelineItem));
      }
    }
    this.proposedSourcesOfFundingControls.clear();
    for (const proposedSource of cip.proposedSourcesOfFunding) {
      this.proposedSourcesOfFundingControls.push(this.uiUtils.createSourceOfFundingForm(proposedSource));
    }
    this.projectTimelinesControls.clear();
    for (const timelineItem of cip.projectTimelines) {
      this.projectTimelinesControls.push(this.uiUtils.createProjectTimelineForm(timelineItem));
    }
    this.outcomesAndPlanningControls.clear();
    for (const outcome of cip.outcomesAndPlanning) {
      this.outcomesAndPlanningControls.push(this.uiUtils.createOutcomesForm(outcome));
    }
    this.requirementsControls.clear();
    for (const requirement of cip.programRequirements) {
      this.requirementsControls.push(this.uiUtils.createRequirementForm(requirement));
    }
  }

  submitForm() {
    const cip: CapitalInvestmentPlan = {
      ...this.form.value,
    };
    this.updatedCip.emit(cip);
    this.form.reset();
  }

  categoriesSelected(selectedCodes) {
    this.selectedCategories = this.categories.filter(current => selectedCodes.includes(current.code));

    for (const category of this.selectedCategories) {
      if (!this.indicatorControls.value.find(current => current.projectCategoryCode === category.code)) {
        this.indicatorControls.push(this.fb.group({
          projectCategoryCode: this.fb.control(category.code),
          outcomes: this.fb.array(
            category.indicators.map(currentOutcome => this.fb.group({
              code: this.fb.control(currentOutcome),
              description: this.fb.control(null),
              selected: this.fb.control(false),
            }))
          ),
        }));
      }
    }
  }

  public getIndicatorOutcomeControls(indicatorIndex) {
    return this.indicatorControls ? this.indicatorControls.controls[indicatorIndex].get('outcomes') as FormArray : null;
  }

  public getCostBreakdownSubtotal() {
    return (this.form && this.form.get('costBreakdown'))
      ? this.uiUtils.getCostBreakdownSubtotal(this.form.get('costBreakdown').value)
      : null;
  }

  public getCostBreakdownTotalHST() {
    return (this.form && this.form.get('costBreakdown'))
      ? this.uiUtils.getCostBreakdownTotalHST(this.form.get('costBreakdown').value)
      : null;
  }

  public getCostBreakdownMinusHSTRebate() {
    return (this.form && this.form.get('costBreakdown'))
      ? this.uiUtils.getCostBreakdownMinusHSTRebate(this.form.get('costBreakdown').value)
      : null;
  }

  public getCostBreakdownTotalEligibleCosts() {
    return (this.form && this.form.get('costBreakdown'))
      ? this.uiUtils.getCostBreakdownTotalEligibleCosts(this.form.get('costBreakdown').value)
      : null;
  }

  public gasTaxExpenditureTimelinePlannedTotal() {
    return (this.form && this.form.get('gasTaxExpenditureTimeline'))
      ? this.uiUtils.gasTaxExpenditureTimelinePlannedTotal(this.form.get('gasTaxExpenditureTimeline').value)
      : null;
  }

  public gasTaxExpenditureTimelineActualTotal() {
    return (this.form && this.form.get('gasTaxExpenditureTimeline'))
      ? this.uiUtils.gasTaxExpenditureTimelineActualTotal(this.form.get('gasTaxExpenditureTimeline').value)
      : null;
  }

  public getFundingSourceLabel(fundingSource: string) {
    return (this.fundingSourceTypes && fundingSource) ? this.fundingSourceTypes.find(current => current.code === fundingSource).label : '';
  }

  public getProjectTimelineLabel(timelineActivity: string) {
    return (this.projectTimelineActivityTypes && timelineActivity)
      ? this.projectTimelineActivityTypes.find(current => current.code === timelineActivity).label : '';
  }

  public getOutcomesAndPlanningLabel(outcome: string) {
    return (this.outcomesAndPlanningTypes && outcome) ? this.outcomesAndPlanningTypes.find(current => current.code === outcome).label : '';
  }

  public getScheduleHIndicatorLabel(indicator: string) {
    return (this.categories && indicator) ? this.categories.find(current => current.code === indicator).text : '';
  }

  public getScheduleHIndicatorOutcomeLabel(outcome: string) {
    return outcome;
  }

  public getRequirementLabel(requirement: string) {
    return this.programRequirementsTypes ? this.programRequirementsTypes.find(current => current.code === requirement).label : '';
  }

  public setSelectedPath(path: string[]) {
    if (!path) {
      return;
    }
    this.selectedFieldPath = path;
  }

  public isSelectedPath(path: string[]) {
    if (!path || path.length !== this.selectedFieldPath.length) {
      return false;
    }
    let areEqual = true;
    for (const [index, value] of this.selectedFieldPath.entries()) {
      if (path[index] !== value) {
        areEqual = false;
        break;
      }
    }
    return areEqual;
  }

  newProjectActivity() {
    this.projectActivityForm.reset();
    let actionId = 1;
    for (const currentProjectActivity of this.projectActivitiesControls.value) {
      if (currentProjectActivity.id >= actionId) {
        actionId = currentProjectActivity.id + 1;
      }
    }
    this.projectActivityForm.get('id').setValue(actionId);
    this.setProjectActivityFormVisibility(true);
  }

  editProjectActivity(projectActivity: ProjectActivity) {
    this.projectActivityForm.get('id').setValue(projectActivity.id);
    this.projectActivityForm.get('activityType').setValue(projectActivity.activityType);
    this.projectActivityForm.get('amount').setValue(projectActivity.amount);
    this.setProjectActivityFormVisibility(true);
  }

  deleteProjectActivity(index: number) {
    this.projectActivitiesControls.removeAt(index);
    this.costBreakdownTable.renderRows();
  }

  saveProjectActivity() {
    const projectActivity: ProjectActivity = {
      ...this.projectActivityForm.value,
    };
    const targetFormGroup = this.projectActivitiesControls.controls.find(
      currentGroup => currentGroup.get('id').value === projectActivity.id
    );
    if (targetFormGroup) {
      targetFormGroup.get('activityType').setValue(projectActivity.activityType);
      targetFormGroup.get('amount').setValue(projectActivity.amount);
    } else {
      this.projectActivitiesControls.push(this.uiUtils.createProjectActivityForm(projectActivity));
    }
    this.projectActivityForm.reset();
    this.setProjectActivityFormVisibility(false);
    this.costBreakdownTable.renderRows();
  }

  cancelProjectActivity() {
    this.projectActivityForm.reset();
    this.setProjectActivityFormVisibility(false);
  }

  setProjectActivityFormVisibility(value: boolean) {
    this.showProjectActivityForm = value;
  }

  getProjectActivityFormClasses() {
    return this.showProjectActivityForm ? 'cost-breakdown-form full-width' : 'cost-breakdown-form full-width hidden';
  }

  getAvailableFiscalYears() {
    let availableYears = [];
    if (this.fiscalYears) {
      if (this.gasTaxExpenditureTimelineControls) {
        for (const currentYear of this.fiscalYears) {
          const yearIndex = this.gasTaxExpenditureTimelineControls.controls.findIndex(
            currentGroup => currentGroup.get('year').value === currentYear.code
          );
          if (yearIndex === -1) {
            // Only add year if not already in list
            availableYears.push(currentYear);
          }
        }
      } else {
        availableYears = [
          ...this.fiscalYears,
        ];
      }
    }
    return availableYears;
  }

  newTimelineItem() {
    this.timelineItemForm.reset();
    this.timelineItemFormOriginalYear = -1; // Ignore for new items
    let year = 0;
    for (const currentTimelineItem of this.gasTaxExpenditureTimelineControls.value) {
      if (currentTimelineItem.year >= year) {
        year = currentTimelineItem.year + 1;
      }
    }
    if (year === 0) {
      // If no timeline entries found, use the current fiscal year as the default
      year = this.uiUtils.getCurrentFiscalYear();
    }
    this.timelineItemForm.get('year').setValue(year);
    this.setTimelineItemFormVisibility(true);
    this.setTimelineTransferFormVisibility(false); // Ensure both forms are not open at the same time.
  }

  editTimelineItem(projectActivity: GasTaxExpenditureTimelineEntry) {
    this.timelineItemFormOriginalYear = projectActivity.year;
    this.timelineItemForm.get('year').setValue(projectActivity.year);
    this.timelineItemForm.get('actualAmount').setValue(projectActivity.actualAmount);
    this.timelineItemForm.get('plannedAmount').setValue(projectActivity.plannedAmount);
    this.setTimelineItemFormVisibility(true);
    this.setTimelineTransferFormVisibility(false); // Ensure both forms are not open at the same time.
  }

  deleteTimelineItem(index: number) {
    this.gasTaxExpenditureTimelineControls.removeAt(index);
    this.expenditureTimelineTable.renderRows();
  }

  saveTimelineItem() {
    const timelineEntry: GasTaxExpenditureTimelineEntry = {
      ...this.timelineItemForm.value,
    };
    let insertRequired = false;
    if (this.timelineItemFormOriginalYear > -1) {
      // Edited an existing record, so we have to find the original record.
      let originalIndex = -1;
      if (this.timelineItemFormOriginalYear !== timelineEntry.year) {
        // Need to move the record in the array
        originalIndex = this.gasTaxExpenditureTimelineControls.controls.findIndex(
          currentGroup => currentGroup.get('year').value === this.timelineItemFormOriginalYear
        );
        this.gasTaxExpenditureTimelineControls.removeAt(originalIndex);
        insertRequired = true;
      } else {
        const targetFormGroup = this.gasTaxExpenditureTimelineControls.controls.find(
          currentGroup => currentGroup.get('year').value === this.timelineItemFormOriginalYear
        );
        targetFormGroup.get('actualAmount').setValue(timelineEntry.actualAmount);
        targetFormGroup.get('plannedAmount').setValue(timelineEntry.plannedAmount);
      }
    } else {
      insertRequired = true;
    }
    if (insertRequired) {
      let newIndex = -1;
      for (const [currentIndex, currentGroup] of this.gasTaxExpenditureTimelineControls.controls.entries()) {
        if (currentGroup.get('year').value > timelineEntry.year) {
          newIndex = currentIndex;
          break;
        }
      }
      if (newIndex > -1) {
        this.gasTaxExpenditureTimelineControls.insert(newIndex, this.uiUtils.createExpenditureTimelineForm(timelineEntry));
      } else {
        this.gasTaxExpenditureTimelineControls.push(this.uiUtils.createExpenditureTimelineForm(timelineEntry));
      }
    }
    this.timelineItemForm.reset();
    this.setTimelineItemFormVisibility(false);
    this.expenditureTimelineTable.renderRows();
  }

  cancelTimelineItem() {
    this.timelineItemForm.reset();
    this.setTimelineItemFormVisibility(false);
  }

  setTimelineItemFormVisibility(value: boolean) {
    this.showTimelineItemForm = value;
  }

  getTimelineItemFormClasses() {
    return this.showTimelineItemForm ? 'timeline-item-form full-width' : 'timeline-item-form full-width hidden';
  }

  getEligibleCips() {
    return this.allMunicipalCips ? this.allMunicipalCips.filter(currentCip => {
      return (currentCip.state in [PlanState.DRAFT, PlanState.SUBMITTED, PlanState.APPROVED, PlanState.WITHDRAWAL_REQUESTED]
        && (this.cip && currentCip.projectNumber !== this.cip.projectNumber));
    }) : [];
  }

  isYearEditable(timelineItem: GasTaxExpenditureTimelineEntry) {
    return timelineItem.year >= this.uiUtils.getCurrentFiscalYear();
  }

  createTimelineTransfer(projectActivity: GasTaxExpenditureTimelineEntry) {
    this.timelineTransferForm.get('timelineEntry').setValue(projectActivity);
    this.setTimelineTransferFormVisibility(true);
    this.setTimelineItemFormVisibility(false); // Ensure both forms are not open at the same time.
  }

  performTimelineTransfer() {
    const timelineTransfer: GasTaxExpenditureTimelineTransfer = {
      ...this.timelineTransferForm.value,
    };
    const targetFormGroup = this.gasTaxExpenditureTimelineControls.controls.find(
      currentGroup => currentGroup.get('year').value === timelineTransfer.timelineEntry.year
    );
    if (targetFormGroup) {
      targetFormGroup.get('actualAmount').setValue(targetFormGroup.get('actualAmount').value - timelineTransfer.actualAmount);
      targetFormGroup.get('plannedAmount').setValue(targetFormGroup.get('plannedAmount').value - timelineTransfer.plannedAmount);
    }
    this.timelineTransferForm.reset();
    this.setTimelineTransferFormVisibility(false);
    this.expenditureTimelineTable.renderRows();

    const updatedTimelineEntries: GasTaxExpenditureTimelineEntry[] = [];
    let entrySaved = false;
    for (const currentEntry of timelineTransfer.cip.gasTaxExpenditureTimeline) {
      if (currentEntry.year === timelineTransfer.timelineEntry.year) {
        updatedTimelineEntries.push({
          year: timelineTransfer.timelineEntry.year,
          plannedAmount: currentEntry.plannedAmount + timelineTransfer.timelineEntry.plannedAmount,
          actualAmount: currentEntry.actualAmount + timelineTransfer.timelineEntry.actualAmount,
        });
        entrySaved = true;
      } else if (currentEntry.year > timelineTransfer.timelineEntry.year) {
        updatedTimelineEntries.push({
          year: timelineTransfer.timelineEntry.year,
          plannedAmount: timelineTransfer.timelineEntry.plannedAmount,
          actualAmount: 0,
        });
        entrySaved = true;
      } else {
        updatedTimelineEntries.push(currentEntry);
      }
    }
    if (!entrySaved) {
      updatedTimelineEntries.push({
        year: timelineTransfer.timelineEntry.year,
        plannedAmount: timelineTransfer.timelineEntry.plannedAmount,
        actualAmount: 0,
      });
    }
    const transferCip = {
      ...timelineTransfer.cip,
      gasTaxExpenditureTimeline: {
        ...timelineTransfer.cip.gasTaxExpenditureTimeline,
        timelineEntries: updatedTimelineEntries,
      }
    };
    this.updatedCip.emit(transferCip);
  }

  cancelTimelineTransfer() {
    this.timelineTransferForm.reset();
    this.setTimelineTransferFormVisibility(false);
  }

  setTimelineTransferFormVisibility(value: boolean) {
    this.showTimelineTransferForm = value;
  }

  getTimelineTransferFormClasses() {
    return this.showTimelineTransferForm ? 'timeline-transfer-form full-width' : 'timeline-transfer-form full-width hidden';
  }

  newSourceOfFunding() {
    this.sourceOfFundingForm.reset();
    let id = 1;
    for (const currentSourceOfFunding of this.proposedSourcesOfFundingControls.value) {
      if (currentSourceOfFunding.id >= id) {
        id = currentSourceOfFunding.id + 1;
      }
    }
    this.sourceOfFundingForm.get('id').setValue(id);
    this.setSourceOfFundingFormVisibility(true);
  }

  editSourceOfFunding(fundingSource: FundingSource) {
    this.sourceOfFundingForm.get('id').setValue(fundingSource.id);
    this.sourceOfFundingForm.get('fundingSource').setValue(fundingSource.fundingSource);
    this.sourceOfFundingForm.get('program').setValue(fundingSource.program);
    this.sourceOfFundingForm.get('confirmed').setValue(fundingSource.confirmed);
    this.sourceOfFundingForm.get('amount').setValue(fundingSource.amount);
    this.setSourceOfFundingFormVisibility(true);
  }

  deleteSourceOfFunding(index: number) {
    this.proposedSourcesOfFundingControls.removeAt(index);
    this.sourcesOfFundingTable.renderRows();
  }

  saveSourceOfFunding() {
    const fundingSource: FundingSource = {
      ...this.sourceOfFundingForm.value,
    };
    const targetFormGroup = this.proposedSourcesOfFundingControls.controls.find(
      currentGroup => currentGroup.get('id').value === fundingSource.id
    );
    if (targetFormGroup) {
      targetFormGroup.get('fundingSource').setValue(fundingSource.fundingSource);
      targetFormGroup.get('program').setValue(fundingSource.program);
      targetFormGroup.get('confirmed').setValue(fundingSource.confirmed);
      targetFormGroup.get('amount').setValue(fundingSource.amount);
    } else {
      this.proposedSourcesOfFundingControls.push(this.uiUtils.createSourceOfFundingForm(fundingSource));
    }
    this.sourceOfFundingForm.reset();
    this.setSourceOfFundingFormVisibility(false);
    this.sourcesOfFundingTable.renderRows();
  }

  cancelSourceOfFunding() {
    this.sourceOfFundingForm.reset();
    this.setSourceOfFundingFormVisibility(false);
  }

  setSourceOfFundingFormVisibility(value: boolean) {
    this.showSourceOfFundingForm = value;
  }

  getSourceOfFundingFormClasses() {
    return this.showSourceOfFundingForm ? 'source-of-funding-form full-width' : 'source-of-funding-form full-width hidden';
  }

  newProjectTimelineEntry() {
    this.projectTimelineEntryForm.reset();
    let id = 1;
    for (const currentProjectTimelineEntry of this.projectTimelinesControls.value) {
      if (currentProjectTimelineEntry.id >= id) {
        id = currentProjectTimelineEntry.id + 1;
      }
    }
    this.projectTimelineEntryForm.get('id').setValue(id);
    this.setProjectTimelineEntryFormVisibility(true);
  }

  editProjectTimelineEntry(projectTimelineEntry: ProjectTimelineEntry) {
    this.projectTimelineEntryForm.get('id').setValue(projectTimelineEntry.id);
    this.projectTimelineEntryForm.get('activity').setValue(projectTimelineEntry.activity);
    this.projectTimelineEntryForm.get('startDate').setValue(projectTimelineEntry.startDate);
    this.projectTimelineEntryForm.get('completionDate').setValue(projectTimelineEntry.completionDate);
    this.setProjectTimelineEntryFormVisibility(true);
  }

  deleteProjectTimelineEntry(index: number) {
    this.projectTimelinesControls.removeAt(index);
    this.projectTimelinesTable.renderRows();
  }

  saveProjectTimelineEntry() {
    const projectTimelineEntry: ProjectTimelineEntry = {
      ...this.projectTimelineEntryForm.value,
    };
    const targetFormGroup = this.projectTimelinesControls.controls.find(
      currentGroup => currentGroup.get('id').value === projectTimelineEntry.id
    );
    if (targetFormGroup) {
      targetFormGroup.get('activity').setValue(projectTimelineEntry.activity);
      targetFormGroup.get('startDate').setValue(projectTimelineEntry.startDate);
      targetFormGroup.get('completionDate').setValue(projectTimelineEntry.completionDate);
    } else {
      this.projectTimelinesControls.push(this.uiUtils.createProjectTimelineForm(projectTimelineEntry));
    }
    this.projectTimelineEntryForm.reset();
    this.setProjectTimelineEntryFormVisibility(false);
    this.projectTimelinesTable.renderRows();
  }

  cancelProjectTimelineEntry() {
    this.projectTimelineEntryForm.reset();
    this.setProjectTimelineEntryFormVisibility(false);
  }

  setProjectTimelineEntryFormVisibility(value: boolean) {
    this.showProjectTimelineEntryForm = value;
  }

  getProjectTimelineEntryFormClasses() {
    return this.showProjectTimelineEntryForm ? 'project-timeline-entry-form full-width' : 'project-timeline-entry-form full-width hidden';
  }

  getMunicipalityName() {
    return (this.municipalContactInfo) ? this.municipalContactInfo.municipalName : '';
  }

  getProjectTitleClasses() {
    return (this.hasProjectNumber()) ? 'half-width' : 'full-width';
  }

  hasProjectNumber() {
    return this.cip?.projectNumber;
  }

  getFiscalYearLabel(fiscalYear: number) {
    return this.uiUtils.getFiscalYearLabel(fiscalYear);
  }

  getActivityTypeLabel(activityType: string) {
    return this.activityTypes.find(currentType => currentType.code === activityType)?.label;
  }

  goToPreviousPage() {
    this.location.back();
  }

  printPage() {
    window.print();
  }
}
