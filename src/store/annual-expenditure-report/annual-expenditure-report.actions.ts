import {createAction, props} from '@ngrx/store';
import {AnnualExpenditureReport} from './annual-expenditure-report.state';

export const loadAnnualExpenditureReport = createAction(
  '[Annual Expenditure Report] Load Report',
  props<{ municipalCode: string, fiscalYear: number }>()
);

export const loadAnnualExpenditureReportSuccess = createAction(
  '[Annual Expenditure Report] Load Report SUCCESS',
  props<{ annualExpenditureReport: AnnualExpenditureReport }>()
);

export const loadAnnualExpenditureReportsForMunicipality = createAction(
  '[Annual Expenditure Reports] Load For Municipality',
  props<{ municipalCode: string, fiscalYears: number[] }>()
);

export const loadAnnualExpenditureReportsForMunicipalitySuccess = createAction(
  '[Annual Expenditure Reports] Load For Municipality SUCCESS',
  props<{ annualExpenditureReports: AnnualExpenditureReport[] }>()
);

export const loadAnnualExpenditureReportsForFiscalYear = createAction(
  '[Annual Expenditure Reports] Load For Fiscal Year',
  props<{ fiscalYear: number }>()
);

export const loadAnnualExpenditureReportsForFiscalYearSuccess = createAction(
  '[Annual Expenditure Reports] Load For Fiscal Year SUCCESS',
  props<{ annualExpenditureReports: AnnualExpenditureReport[] }>()
);

export const updateAnnualExpenditureReport = createAction(
  '[Annual Expenditure Report] Update',
  props<{ annualExpenditureReport: AnnualExpenditureReport }>()
  );

export const updateAnnualExpenditureReportSuccess = createAction(
  '[Annual Expenditure Report] Update SUCCESS',
  props<{ annualExpenditureReport: AnnualExpenditureReport }>()
);
