import { createSelector } from '@ngrx/store';
import {ApplicationState} from '../index';
import {MunicipalAllocationsState} from './municipal-allocations.state';

export const selectMunicipalAllocationsState = (state: ApplicationState) => state['municipal-allocations'];

export const selectMunicipalAllocations = createSelector(
  selectMunicipalAllocationsState,
  (state: MunicipalAllocationsState) => state.municipalAllocations
);
