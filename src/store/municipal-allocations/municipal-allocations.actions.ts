import {createAction, props} from '@ngrx/store';
import {MunicipalAllocations} from './municipal-allocations.state';

export const loadMunicipalAllocations = createAction(
  '[Municipal Allocations] Load',
);

export const loadMunicipalAllocationsSuccess = createAction(
  '[Municipal Allocations] Load SUCCESS',
  props<{ municipalAllocations: MunicipalAllocations[] }>()
);

