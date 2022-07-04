import {createAction, props} from '@ngrx/store';
import {CodeType, Municipality, ProjectObjective} from './static-data.state';

export const loadMunicipalities = createAction(
  '[Static Data] Load Municipalities',
);

export const loadMunicipalitiesSuccess = createAction(
  '[Static Data] Load Municipalities SUCCESS',
  props<{ municipalities: Municipality[] }>()
);

export const loadProjectTypes = createAction(
  '[Static Data] Load Project Types',
);

export const loadProjectTypesSuccess = createAction(
  '[Static Data] Load Project Types SUCCESS',
  props<{ projectTypes: CodeType[] }>()
);

export const loadActivityTypes = createAction(
  '[Static Data] Load Activity Types',
);

export const loadActivityTypesSuccess = createAction(
  '[Static Data] Load Activity Types SUCCESS',
  props<{ activityTypes: CodeType[] }>()
);

export const loadOutcomesAndPlanningTypes = createAction(
  '[Static Data] Load Outcomes And Planning Types',
);

export const loadOutcomesAndPlanningTypesSuccess = createAction(
  '[Static Data] Load Outcomes And Planning Types SUCCESS',
  props<{ outcomesAndPlanningTypes: CodeType[] }>()
);

export const loadFundingSourceTypes = createAction(
  '[Static Data] Load Funding Source Types',
);

export const loadFundingSourceTypesSuccess = createAction(
  '[Static Data] Load Funding Source Types SUCCESS',
  props<{ fundingSourceTypes: CodeType[] }>()
);

export const loadProgramRequirementsTypes = createAction(
  '[Static Data] Load Program Requirements Types',
);

export const loadProgramRequirementsTypesSuccess = createAction(
  '[Static Data] Load Program Requirements Types SUCCESS',
  props<{ programRequirementsTypes: CodeType[] }>()
);

export const loadProjectTimelineActivityTypes = createAction(
  '[Static Data] Load Project Timeline Activity Types',
);

export const loadProjectTimelineActivityTypesSuccess = createAction(
  '[Static Data] Load Project Timeline Activity Types SUCCESS',
  props<{ projectTimelineActivityTypes: CodeType[] }>()
);

export const loadProjectObjectives = createAction(
  '[Static Data] Load Objective Types',
);

export const loadProjectObjectivesSuccess = createAction(
  '[Static Data] Load Objective Types SUCCESS',
  props<{ objectives: ProjectObjective[] }>()
);

export const loadAERActionTypes = createAction(
  '[Static Data] Load AER Action Types',
);

export const loadAERActionTypesSuccess = createAction(
  '[Static Data] Load AER Action Types SUCCESS',
  props<{ actionTypes: CodeType[] }>()
);
