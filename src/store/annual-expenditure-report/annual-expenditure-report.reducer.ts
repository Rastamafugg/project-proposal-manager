import {createReducer, on} from '@ngrx/store';
import {DEFAULT_ANNUAL_EXPENDITURE_REPORT_STATE} from './annual-expenditure-report.state';
import {
  loadAnnualExpenditureReportsForFiscalYearSuccess,
  loadAnnualExpenditureReportsForMunicipalitySuccess,
  loadAnnualExpenditureReportSuccess,
  updateAnnualExpenditureReport, updateAnnualExpenditureReportSuccess
} from './annual-expenditure-report.actions';

const REDUCER = createReducer(DEFAULT_ANNUAL_EXPENDITURE_REPORT_STATE,
  on(loadAnnualExpenditureReportSuccess, (state, action) => ({
      ...state,
      aers: [action.annualExpenditureReport],
    })
  ),
  on(loadAnnualExpenditureReportsForMunicipalitySuccess, (state, action) => ({
      ...state,
      aers: action.annualExpenditureReports,
    })
  ),
  on(loadAnnualExpenditureReportsForFiscalYearSuccess, (state, action) => ({
      ...state,
      aers: action.annualExpenditureReports,
    })
  ),
  on(updateAnnualExpenditureReportSuccess, (state, action) => {
    const updatedAers = [];
    for (const current of state.aers) {
      if (current.municipalCode === action.annualExpenditureReport.municipalCode
        && current.fiscalYear === action.annualExpenditureReport.fiscalYear) {
        updatedAers.push(action.annualExpenditureReport);
      } else {
        updatedAers.push(current);
      }
    }
    return {
      ...state,
      aers: updatedAers,
    };
  }),
);

export function annualExpenditureReportReducer(state, action) {
  return REDUCER(state, action);
}
