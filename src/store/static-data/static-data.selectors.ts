import { createSelector } from '@ngrx/store';
import {ApplicationState} from '../index';
import {StaticDataState} from './static-data.state';

export const selectStaticData = (state: ApplicationState) => state['static-data'];

export const selectMunicipalities = createSelector(
  selectStaticData,
  (state: StaticDataState) => state.municipalities
);

export const selectProjectTypes = createSelector(
  selectStaticData,
  (state: StaticDataState) => state['project-types']
);

export const selectActivityTypes = createSelector(
  selectStaticData,
  (state: StaticDataState) => state['activity-types']
);

export const selectOutcomesAndPlanningTypes = createSelector(
  selectStaticData,
  (state: StaticDataState) => state['outcomes-and-planning-types']
);

export const selectFundingSourceTypes = createSelector(
  selectStaticData,
  (state: StaticDataState) => state['funding-source-types']
);

export const selectProgramRequirementsTypes = createSelector(
  selectStaticData,
  (state: StaticDataState) => state['program-requirements-types']
);

export const selectProjectTimelineActivityTypes = createSelector(
  selectStaticData,
  (state: StaticDataState) => state['project-timeline-activity-types']
);

export const selectProjectObjectives = createSelector(
  selectStaticData,
  (state: StaticDataState) => state['project-objectives']
);

export const selectAERActionTypes = createSelector(
  selectStaticData,
  (state: StaticDataState) => state['aer-action-types']
);
