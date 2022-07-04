export enum CIPAction {
  NEW = 'new',
  EDIT = 'edit',
  AMEND = 'amend',
  VIEW = 'view',
}

export interface Option {
  code: string;
  description?: string;
  selected: boolean;
}

export interface IndicatorAndOutcomes {
  projectCategoryCode: string;
  outcomes: Option[];
}

export interface ProjectActivity {
  id: number;
  activityType: string;
  amount: number;
}

export interface GasTaxExpenditureTimelineEntry {
  year: number;
  plannedAmount: number;
  actualAmount?: number;
}

export interface GasTaxExpenditureTimelineTransfer {
  timelineEntry: GasTaxExpenditureTimelineEntry;
  cip: CapitalInvestmentPlan;
  plannedAmount: number;
  actualAmount?: number;
}

export interface FundingSource {
  id: number;
  fundingSource: string;
  program?: string;
  confirmed: boolean;
  amount: number;
}

export interface ProjectTimelineEntry {
  id: number;
  activity: string;
  startDate: Date;
  completionDate: Date;
}

export interface CapitalInvestmentPlan {
  municipalCode: string;
  projectNumber?: string;
  projectTitle: string;
  projectType: string;
  version: number;
  state: PlanState;
  projectCategories?: string[];
  projectDescription: string;
  projectLocation: string;
  projectMunicipality: string;
  projectPostalCode: string;
  councilResolutionMailed: boolean;
  dateOfResolution: Date;
  costBreakdown: ProjectActivity[];
  gasTaxExpenditureTimeline: GasTaxExpenditureTimelineEntry[];
  proposedSourcesOfFunding: FundingSource[];
  projectTimelines: ProjectTimelineEntry[];
  outcomesAndPlanning: Option[];
  scheduleHIndicators: IndicatorAndOutcomes[];
  programRequirements: Option[];
}

export enum PlanState {
  DRAFT,
  SUBMITTED,
  REJECTED,
  APPROVED,
  WITHDRAWAL_REQUESTED,
  WITHDRAWN,
  COMPLETED,
  REPLACED,
}

export interface CapitalInvestmentPlanState {
  cips: CapitalInvestmentPlan[];
}


export const DEFAULT_CAPITAL_INVESTMENT_PLAN_STATE: CapitalInvestmentPlanState = {
  cips: [],
};
