import {createAction, props} from '@ngrx/store';
import {CapitalInvestmentPlan, ProjectActivity} from './capital-investment-plan.state';

export const createCapitalInvestmentPlan = createAction(
  '[Capital Investment Plan] Create',
  props<{ capitalInvestmentPlan: CapitalInvestmentPlan }>());

export const createCapitalInvestmentPlanSuccess = createAction(
  '[Capital Investment Plan] Create SUCCESS',
  props<{ capitalInvestmentPlans: CapitalInvestmentPlan[] }>());

export const updateCapitalInvestmentPlan = createAction(
  '[Capital Investment Plan] Update',
  props<{ capitalInvestmentPlan: CapitalInvestmentPlan }>());

export const updateCapitalInvestmentPlanSuccess = createAction(
  '[Capital Investment Plan] Update SUCCESS',
  props<{ capitalInvestmentPlans: CapitalInvestmentPlan[] }>());

export const amendCapitalInvestmentPlan = createAction(
  '[Capital Investment Plan] Amend',
  props<{ capitalInvestmentPlan: CapitalInvestmentPlan }>());

export const amendCapitalInvestmentPlanSuccess = createAction(
  '[Capital Investment Plan] Amend SUCCESS',
  props<{ capitalInvestmentPlans: CapitalInvestmentPlan[] }>());

export const deleteCapitalInvestmentPlan = createAction(
  '[Capital Investment Plan] Delete',
  props<{ capitalInvestmentPlan: CapitalInvestmentPlan, filterResultsByMunicipality: boolean }>());

export const deleteCapitalInvestmentPlanSuccess = createAction(
  '[Capital Investment Plan] Delete SUCCESS',
  props<{ capitalInvestmentPlans: CapitalInvestmentPlan[] }>());

export const loadCapitalInvestmentPlans = createAction(
  '[Capital Investment Plan] Load Plans For Municipality',
  props<{ municipalCode: string }>());

export const loadCapitalInvestmentPlansSuccess = createAction(
  '[Capital Investment Plan] Load Plans For Municipality SUCCESS',
  props<{ capitalInvestmentPlans: CapitalInvestmentPlan[] }>());

export const loadCapitalInvestmentPlansFailure = createAction(
  '[Capital Investment Plan] Load Plans For Municipality FAILURE',
  props<{ municipalCode: string }>());

export const loadAllCapitalInvestmentPlans = createAction(
  '[Capital Investment Plan] Load All Plans',
);

export const loadAllCapitalInvestmentPlansSuccess = createAction(
  '[Capital Investment Plan] Load All Plans SUCCESS',
  props<{ capitalInvestmentPlans: CapitalInvestmentPlan[] }>());

export const loadAllCapitalInvestmentPlansFailure = createAction(
  '[Capital Investment Plan] Load All Plans FAILURE',
);

// export const addProjectCategory = createAction(
//   '[Capital Investment Plan] Add Project Category',
//   props<{ projectNumber: string, category: ProjectCategory }>());
//
// export const removeProjectCategory = createAction(
//   '[Capital Investment Plan] Remove Project Category',
//   props<{ projectNumber: string, category: ProjectCategory }>());

export const addProjectActivity = createAction(
  '[Capital Investment Plan] Add Project Activity',
  props<{ projectNumber: string, activity: ProjectActivity }>());

export const removeProjectActivity = createAction(
  '[Capital Investment Plan] Remove Project Activity',
  props<{ projectNumber: string, activity: ProjectActivity }>());
