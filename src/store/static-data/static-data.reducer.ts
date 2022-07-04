import {createReducer, on} from '@ngrx/store';
import {
  loadActivityTypesSuccess, loadAERActionTypesSuccess,
  loadFundingSourceTypesSuccess,
  loadMunicipalitiesSuccess,
  loadOutcomesAndPlanningTypesSuccess,
  loadProgramRequirementsTypesSuccess,
  loadProjectObjectivesSuccess,
  loadProjectTimelineActivityTypesSuccess,
  loadProjectTypesSuccess,
} from './static-data.actions';
import {DEFAULT_STATIC_DATA_STATE} from './static-data.state';

const REDUCER = createReducer(DEFAULT_STATIC_DATA_STATE,
  on(loadMunicipalitiesSuccess, (state, action) => ({
    ...state,
    municipalities: action.municipalities,
  })),
  on(loadProjectTypesSuccess, (state, action) => ({
    ...state,
    'project-types': action.projectTypes,
  })),
  on(loadActivityTypesSuccess, (state, action) => ({
    ...state,
    'activity-types': action.activityTypes,
  })),
  on(loadOutcomesAndPlanningTypesSuccess, (state, action) => ({
    ...state,
    'outcomes-and-planning-types': action.outcomesAndPlanningTypes,
  })),
  on(loadFundingSourceTypesSuccess, (state, action) => ({
    ...state,
    'funding-source-types': action.fundingSourceTypes,
  })),
  on(loadProgramRequirementsTypesSuccess, (state, action) => ({
    ...state,
    'program-requirements-types': action.programRequirementsTypes,
  })),
  on(loadProjectTimelineActivityTypesSuccess, (state, action) => ({
    ...state,
    'project-timeline-activity-types': action.projectTimelineActivityTypes,
  })),
  on(loadProjectObjectivesSuccess, (state, action) => ({
    ...state,
    'project-objectives': action.objectives,
  })),
  on(loadAERActionTypesSuccess, (state, action) => ({
    ...state,
    'aer-action-types': action.actionTypes,
  })),
);

export function staticDataReducer(state, action) {
  return REDUCER(state, action);
}
