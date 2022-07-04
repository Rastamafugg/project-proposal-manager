import {createReducer, on} from '@ngrx/store';
import {DEFAULT_MUNICIPAL_ALLOCATIONS_STATE} from './municipal-allocations.state';
import {loadMunicipalAllocationsSuccess} from './municipal-allocations.actions';

const REDUCER = createReducer(DEFAULT_MUNICIPAL_ALLOCATIONS_STATE,
  on(loadMunicipalAllocationsSuccess, (state, action) => ({ municipalAllocations: action.municipalAllocations })),
);

export function municipalAllocationsReducer(state, action) {
  return REDUCER(state, action);
}
