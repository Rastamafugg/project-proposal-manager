import { createSelector } from '@ngrx/store';
import {ApplicationState} from '../index';
import {CapitalInvestmentPlanState} from './capital-investment-plan.state';

export const selectCIPData = (state: ApplicationState) => state['capital-investment-plan'];

export const selectAllCapitalInvestmentPlans = createSelector(
  selectCIPData,
  (state: CapitalInvestmentPlanState) => state.cips
);

export const selectMunicipalCapitalInvestmentPlans = createSelector(
  selectCIPData,
  (state: CapitalInvestmentPlanState, props) => state.cips.filter(current => current.municipalCode === props.municipalCode)
);

export const selectCapitalInvestmentPlan = createSelector(
  selectCIPData,
  (state: CapitalInvestmentPlanState, props) => state.cips.find(
    current => current.projectNumber === props.projectNumber && current.version === parseInt(props.version, 0)
  )
);
