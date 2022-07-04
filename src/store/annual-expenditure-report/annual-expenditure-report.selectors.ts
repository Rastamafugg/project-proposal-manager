import {ApplicationState} from '../index';
import {createSelector} from '@ngrx/store';
import {AnnualExpenditureReportState} from './annual-expenditure-report.state';

export const selectAERData = (state: ApplicationState) => state['annual-expenditure-report'];

export const selectAERs = createSelector(
  selectAERData,
  (state: AnnualExpenditureReportState) => state.aers
);

export const selectAnnualExpenditureReport = createSelector(
  selectAERData,
  (state: AnnualExpenditureReportState, props) => state.aers.find(
    current => current.municipalCode === props.municipalCode && current.fiscalYear === parseInt(props.fiscalYear, 0)
  )
);
