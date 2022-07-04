import {createReducer, on} from '@ngrx/store';
import {
  amendCapitalInvestmentPlanSuccess,
  createCapitalInvestmentPlanSuccess,
  deleteCapitalInvestmentPlanSuccess,
  loadAllCapitalInvestmentPlansSuccess,
  loadCapitalInvestmentPlansSuccess,
  updateCapitalInvestmentPlanSuccess,
} from './capital-investment-plan.actions';
import {DEFAULT_CAPITAL_INVESTMENT_PLAN_STATE} from './capital-investment-plan.state';

const REDUCER = createReducer(DEFAULT_CAPITAL_INVESTMENT_PLAN_STATE,
  on(loadCapitalInvestmentPlansSuccess, (state, action) => ({
      ...state,
      cips: action.capitalInvestmentPlans,
    })
  ),
  on(loadAllCapitalInvestmentPlansSuccess, (state, action) => ({
      ...state,
      cips: action.capitalInvestmentPlans,
    })
  ),
  on(createCapitalInvestmentPlanSuccess, (state, action) => ({
      ...state,
    cips: action.capitalInvestmentPlans,
    })
  ),
  on(updateCapitalInvestmentPlanSuccess, (state, action) => ({
      ...state,
      cips: action.capitalInvestmentPlans,
    })
  ),
  on(amendCapitalInvestmentPlanSuccess, (state, action) => ({
      ...state,
      cips: action.capitalInvestmentPlans,
    })
  ),
  on(deleteCapitalInvestmentPlanSuccess, (state, action) => ({
      ...state,
      cips: action.capitalInvestmentPlans,
    })
  ),
);

export function capitalInvestmentPlanReducer(state, action) {
  return REDUCER(state, action);
}
