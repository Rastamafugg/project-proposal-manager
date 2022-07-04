import {CapitalInvestmentPlan} from '../capital-investment-plan/capital-investment-plan.state';
import {CodeType} from '../static-data/static-data.state';

export interface AnnualExpenditureReport {
  municipalCode: string;
  fiscalYear: number;
  reportState: ReportState;
  allocationReceived: number;
  allocationInterest: number;
  actions: ReportAction[];
  capitalInvestmentPlans: CapitalInvestmentPlan[];
}

export interface ReportAction {
  id: number;
  actionType: CodeType;
  date: Date;
  description: string;
}

export enum ReportState {
  DRAFT,
  SUBMITTED,
  APPROVED,
}

export interface AnnualExpenditureReportState {
  aers: AnnualExpenditureReport[];
}

export const DEFAULT_ANNUAL_EXPENDITURE_REPORT_STATE: AnnualExpenditureReportState = {
  aers: [],
};
