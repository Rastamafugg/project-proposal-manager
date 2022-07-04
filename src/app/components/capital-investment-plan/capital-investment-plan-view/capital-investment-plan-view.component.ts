import {Component, Input} from '@angular/core';
import {CapitalInvestmentPlan} from '../../../../store/capital-investment-plan/capital-investment-plan.state';
import {CodeType, ProjectObjective} from '../../../../store/static-data/static-data.state';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store';
import {RestService} from '../../../../services/rest.service';
import {UiUtilsService} from '../../../../services/ui-utils.service';
import {ContactInfo} from '../../../../store/contact-info/contact-info.state';
import {Location} from '@angular/common';

@Component({
  selector: 'app-capital-investment-plan-view',
  templateUrl: './capital-investment-plan-view.component.html',
  styleUrls: ['./capital-investment-plan-view.component.scss']
})
export class CapitalInvestmentPlanViewComponent {
  @Input() cip: CapitalInvestmentPlan;
  @Input() municipalContactInfo: ContactInfo;
  @Input() isProvincialInterface: boolean;
  @Input() projectTypes: CodeType[] = [];
  @Input() activityTypes: CodeType[] = [];
  @Input() outcomesAndPlanningTypes: CodeType[] = [];
  @Input() fundingSourceTypes: CodeType[] = [];
  @Input() programRequirementsTypes: CodeType[] = [];
  @Input() projectTimelineActivityTypes: CodeType[] = [];
  @Input() categories: ProjectObjective[] = [];
  @Input() timelineRange;

  activityTableColumns = ['description', 'amount'];
  expenditureTimelineColumns = ['year', 'plannedAmount', 'actualAmount'];
  fundingSourcesColumns = ['fundingSource', 'program', 'confirmed', 'amount'];
  projectTimelinesColumns = ['activity', 'startDate', 'completionDate'];

  constructor(
    private store: Store<ApplicationState>,
    private fb: FormBuilder,
    private restService: RestService,
    private uiUtils: UiUtilsService,
    private location: Location,
  ) {}

  public getCostBreakdownSubtotal() {
    return (this.cip && this.cip.costBreakdown)
      ? this.uiUtils.getCostBreakdownSubtotal(this.cip.costBreakdown)
      : null;
  }

  public getCostBreakdownTotalHST() {
    return (this.cip && this.cip.costBreakdown)
      ? this.uiUtils.getCostBreakdownTotalHST(this.cip.costBreakdown)
      : null;
  }

  public getCostBreakdownMinusHSTRebate() {
    return (this.cip && this.cip.costBreakdown)
      ? this.uiUtils.getCostBreakdownMinusHSTRebate(this.cip.costBreakdown)
      : null;
  }

  public getCostBreakdownTotalEligibleCosts() {
    return (this.cip && this.cip.costBreakdown)
      ? this.uiUtils.getCostBreakdownTotalEligibleCosts(this.cip.costBreakdown)
      : null;
  }

  public gasTaxExpenditureTimelinePlannedTotal() {
    return (this.cip && this.cip.gasTaxExpenditureTimeline)
      ? this.uiUtils.gasTaxExpenditureTimelinePlannedTotal(this.cip.gasTaxExpenditureTimeline)
      : null;
  }

  public gasTaxExpenditureTimelineActualTotal() {
    return (this.cip && this.cip.gasTaxExpenditureTimeline)
      ? this.uiUtils.gasTaxExpenditureTimelineActualTotal(this.cip.gasTaxExpenditureTimeline)
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

  public getProjectCategories() {
    return this.cip
      ? this.cip.scheduleHIndicators.map(
        current => this.categories.find(category => category.code === current.projectCategoryCode).text
      ).join(', ') : '';
  }

  getMunicipalityName() {
    return (this.municipalContactInfo) ? this.municipalContactInfo.municipalName : '';
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

  getProjectTypeLabel() {
    return (this.cip && this.projectTypes && this.projectTypes.length > 0)
      ? this.projectTypes.find(currentType => currentType.code === this.cip.projectType).label
      : null;
  }
}
