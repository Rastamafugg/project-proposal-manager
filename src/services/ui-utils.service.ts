import {Injectable} from '@angular/core';
import {
  CapitalInvestmentPlan,
  FundingSource,
  GasTaxExpenditureTimelineEntry,
  GasTaxExpenditureTimelineTransfer,
  IndicatorAndOutcomes,
  Option,
  PlanState,
  ProjectActivity,
  ProjectTimelineEntry
} from '../store/capital-investment-plan/capital-investment-plan.state';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {CodeType} from '../store/static-data/static-data.state';
import {
  AnnualExpenditureReport,
  ReportAction,
  ReportState
} from '../store/annual-expenditure-report/annual-expenditure-report.state';

@Injectable({
  providedIn: 'root'
})
export class UiUtilsService {

  constructor(
    private fb: UntypedFormBuilder,
  ) {
  }

  getFiscalYearLabel(fiscalYear: number) {
    return `${fiscalYear}/${(fiscalYear % 100 + 1).toString(10).padStart(2, '0')}`;
  }

  getCurrentFiscalYear(): number {
    // Fiscal year ends at the end of March
    const currentDate = new Date();
    return currentDate.getMonth() <= 2 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
  }

  get5YearBlockForFiscalYear(fiscalYear: number): CodeType[] {
    const fiscalYears = [];
    const lastYearDigit = parseInt(fiscalYear.toString(10)[3], 10);
    let yearNumber;
    if (lastYearDigit >= 4 && lastYearDigit < 9) {
      yearNumber = lastYearDigit - 4;
    } else if (lastYearDigit === 9) {
      yearNumber = 0;
    } else { // lastYearDigit < 4
      yearNumber = lastYearDigit + 1;
    }
    for (let year = (fiscalYear - yearNumber); year < (fiscalYear - yearNumber + 5); year += 1) {
      fiscalYears.push({
        code: year,
        label: this.getFiscalYearLabel(year),
      });
    }
    return fiscalYears;
  }

  getAllFiscalYears(): CodeType[] {
    const fiscalYears = [];
    for (let year = 2000; year <= 2023; year += 1) {
      fiscalYears.push({
        code: year,
        label: this.getFiscalYearLabel(year),
      });
    }
    return fiscalYears;
  }

  getCIPStateText(stateCode) {
    switch (stateCode) {
      case PlanState.DRAFT: {
        return 'DRAFT';
      }
      case PlanState.SUBMITTED: {
        return 'SUBMITTED';
      }
      case PlanState.REJECTED: {
        return 'REJECTED';
      }
      case PlanState.APPROVED: {
        return 'APPROVED';
      }
      case PlanState.WITHDRAWAL_REQUESTED: {
        return 'WITHDRAWAL REQUESTED';
      }
      case PlanState.WITHDRAWN: {
        return 'WITHDRAWN';
      }
      case PlanState.COMPLETED: {
        return 'COMPLETED';
      }
    }
  }

  getAERStateText(stateCode) {
    switch (stateCode) {
      case ReportState.DRAFT: {
        return 'DRAFT';
      }
      case ReportState.SUBMITTED: {
        return 'SUBMITTED';
      }
      case ReportState.APPROVED: {
        return 'APPROVED';
      }
    }
  }

  isPlanInDraft(plan: CapitalInvestmentPlan) {
    return plan && plan.state === PlanState.DRAFT;
  }

  isPlanSubmitted(plan: CapitalInvestmentPlan) {
    return plan && plan.state === PlanState.SUBMITTED;
  }

  isPlanAmendable(plan: CapitalInvestmentPlan) {
    return plan && (plan.state === PlanState.APPROVED || plan.state === PlanState.REJECTED);
  }

  isPlanReadOnly(plan: CapitalInvestmentPlan) {
    return plan && (plan.state === PlanState.COMPLETED);
  }

  isPlanApproved(plan: CapitalInvestmentPlan) {
    return plan && (plan.state === PlanState.APPROVED);
  }

  isPlanWithdrawalRequested(plan: CapitalInvestmentPlan) {
    return plan && (plan.state === PlanState.WITHDRAWAL_REQUESTED);
  }

  getCostBreakdownSubtotal(costBreakdown: ProjectActivity[]) {
    return costBreakdown.reduce(((accumulator, currentValue) => accumulator + currentValue.amount), 0);
  }

  getCostBreakdownTotalHST(costBreakdown: ProjectActivity[]) {
    return (this.getCostBreakdownSubtotal(costBreakdown) * 15) / 100;
  }

  getCostBreakdownMinusHSTRebate(costBreakdown: ProjectActivity[]) {
    return (this.getCostBreakdownSubtotal(costBreakdown) * 5) / 100;
  }

  getCostBreakdownTotalEligibleCosts(costBreakdown: ProjectActivity[]) {
    return (this.getCostBreakdownSubtotal(costBreakdown) * 110) / 100;
  }

  gasTaxExpenditureTimelinePlannedTotal(gasTaxExpenditureTimeline: GasTaxExpenditureTimelineEntry[]) {
    return gasTaxExpenditureTimeline.reduce(((accumulator, currentValue) => accumulator + currentValue.plannedAmount), 0);
  }

  gasTaxExpenditureTimelineActualTotal(gasTaxExpenditureTimeline: GasTaxExpenditureTimelineEntry[]) {
    return gasTaxExpenditureTimeline.reduce(((accumulator, currentValue) => accumulator + currentValue.actualAmount), 0);
  }

  createCapitalInvestmentPlanForm(cip?: CapitalInvestmentPlan) {
    return this.fb.group({
      municipalCode: this.fb.control(cip?.municipalCode),
      projectTitle: this.fb.control(cip?.projectTitle, [Validators.required]),
      projectNumber: this.fb.control(cip?.projectNumber),
      version: this.fb.control(cip?.version),
      state: this.fb.control(cip?.state),
      projectCategories: this.fb.control(cip?.projectCategories, [Validators.required]),
      projectDescription: this.fb.control(cip?.projectDescription, [Validators.required]),
      projectLocation: this.fb.control(cip?.projectLocation, [Validators.required]),
      projectMunicipality: this.fb.control(cip?.projectMunicipality, [Validators.required]),
      projectPostalCode: this.fb.control(cip?.projectPostalCode, [Validators.required]),
      projectType: this.fb.control(cip?.projectType, [Validators.required]),
      councilResolutionMailed: this.fb.control(cip?.councilResolutionMailed),
      dateOfResolution: this.fb.control(cip?.dateOfResolution),
      costBreakdown: this.fb.array(
        cip ? cip.costBreakdown.map(current => this.createProjectActivityForm(current)) : []),
      gasTaxExpenditureTimeline: this.fb.array(
        cip ? cip.gasTaxExpenditureTimeline.map(current => this.createExpenditureTimelineForm(current)) : []),
      proposedSourcesOfFunding: this.fb.array(
        cip ? cip.proposedSourcesOfFunding.map(current => this.createSourceOfFundingForm(current)) : []),
      projectTimelines: this.fb.array(
        cip ? cip.projectTimelines.map(current => this.createProjectTimelineForm(current)) : []),
      scheduleHIndicators: this.fb.array(
        cip ? cip.scheduleHIndicators.map(current => this.createIndicatorForm(current)) : []),
      outcomesAndPlanning: this.fb.array(
        cip ? cip.outcomesAndPlanning.map(current => this.createOutcomesForm(current)) : []),
      programRequirements: this.fb.array(
        cip ? cip.programRequirements.map(current => this.createRequirementForm(current)) : []),
    });
  }

  createRequirementForm(requirement: Option) {
    return this.fb.group({
      code: this.fb.control(requirement.code),
      description: this.fb.control(requirement.description),
      selected: this.fb.control(requirement.selected),
    });
  }

  createOutcomesForm(outcome: Option) {
    return this.fb.group({
      code: this.fb.control(outcome.code),
      description: this.fb.control(outcome.description),
      selected: this.fb.control(outcome.selected),
    });
  }

  createProjectTimelineForm(timelineItem?: ProjectTimelineEntry) {
    return this.fb.group({
      id: this.fb.control(timelineItem ? timelineItem.id : 0),
      activity: this.fb.control(timelineItem?.activity, [Validators.required]),
      startDate: this.fb.control(timelineItem?.startDate, [Validators.required]),
      completionDate: this.fb.control(timelineItem?.completionDate, [Validators.required]),
    });
  }

  createSourceOfFundingForm(proposedSource?: FundingSource) {
    return this.fb.group({
      id: this.fb.control(proposedSource ? proposedSource.id : 0),
      fundingSource: this.fb.control(proposedSource?.fundingSource, [Validators.required]),
      program: this.fb.control(proposedSource?.program),
      confirmed: this.fb.control(proposedSource?.confirmed),
      amount: this.fb.control(proposedSource?.amount, [Validators.required, Validators.min(0)]),
    });
  }

  createExpenditureTimelineForm(timelineItem?: GasTaxExpenditureTimelineEntry) {
    return this.fb.group({
      year: this.fb.control(timelineItem ? timelineItem.year : 0, [Validators.required]),
      plannedAmount: this.fb.control(timelineItem ? timelineItem.plannedAmount : null, [Validators.required, Validators.min(0)]),
      actualAmount: this.fb.control(timelineItem ? timelineItem.actualAmount : null),
    });
  }

  createExpenditureTimelineTransferForm() {
    return this.fb.group({
      timelineEntry: this.fb.control(null, [Validators.required]),
      cip: this.fb.control(null, [Validators.required]),
      plannedAmount: this.fb.control(0, [Validators.required, Validators.min(0)]),
      actualAmount: this.fb.control(0, [Validators.required, Validators.min(0)]),
    });
  }

  createProjectActivityForm(activity?: ProjectActivity) {
    return this.fb.group({
      id: this.fb.control(activity ? activity.id : 0, [Validators.required]),
      activityType: this.fb.control(activity ? activity.activityType : null, [Validators.required]),
      amount: this.fb.control(activity ? activity.amount : 0, [Validators.required, Validators.min(0)]),
    });
  }

  createIndicatorForm(indicator: IndicatorAndOutcomes) {
    return this.fb.group({
      projectCategoryCode: this.fb.control(indicator.projectCategoryCode),
      outcomes: this.fb.array(
        indicator.outcomes.map(currentOutcome => this.fb.group({
          code: this.fb.control(currentOutcome.code),
          description: this.fb.control(currentOutcome.description),
          selected: this.fb.control(currentOutcome.selected),
        }))
      ),
    });
  }

  createAnnualExpenditureReportForm(aer: AnnualExpenditureReport) {
    return this.fb.group({
      municipalCode: this.fb.control(aer.municipalCode),
      fiscalYear: this.fb.control(aer.fiscalYear),
      reportState: this.fb.control(aer.reportState),
      allocationReceived: this.fb.control(aer.allocationReceived),
      allocationInterest: this.fb.control(aer.allocationInterest),
      actions: this.fb.array(
        aer.actions.map(current => this.createReportActionForm(current))
      ),
      capitalInvestmentPlans: this.fb.array(
        aer.capitalInvestmentPlans.map(current => this.createCapitalInvestmentPlanForm(current))
      ),
    });
  }

  createAnnualExpenditureReportsForm(aers: AnnualExpenditureReport[]) {
    return this.fb.array(aers.map(current => this.createAnnualExpenditureReportForm(current)));
  }

  createReportActionForm(action?: ReportAction) {
    return this.fb.group({
      id: this.fb.control(action?.id),
      date: this.fb.control(action?.date, [Validators.required]),
      actionType: this.fb.control(action?.actionType, [Validators.required]),
      description: this.fb.control(action?.description, [Validators.required]),
    });
  }

  createContactForm() {
    return this.fb.group({
      municipalCode: this.fb.control(null, [Validators.required]),
      municipalName: this.fb.control(null, [Validators.required]),
      streetAddress: this.fb.control(null, [Validators.required]),
      postalCode: this.fb.control(null, [Validators.required]),
      phoneNumber: this.fb.control(null, [Validators.required]),
      emailAddress: this.fb.control(null, [Validators.required]),
      faxNumber: this.fb.control(null, [Validators.required]),
      contactName: this.fb.control(null, [Validators.required]),
      officialTitle: this.fb.control(null, [Validators.required]),
      auditorName: this.fb.control(null, [Validators.required]),
      auditFirmName: this.fb.control(null, [Validators.required]),
      auditorPhoneNumber: this.fb.control(null, [Validators.required]),
      auditorEmailAddress: this.fb.control(null, [Validators.required]),
      auditorFaxNumber: this.fb.control(null, [Validators.required]),
    });
  }

  createAllocationAmountForm() {
    return this.fb.group({
      fiscalYear: this.fb.control(null),
      allocationReceived: this.fb.control(null, [Validators.required, Validators.min(0)]),
      applyForward: this.fb.control(false),
    });
  }
}
