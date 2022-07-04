import {Municipality} from '../static-data/static-data.state';

export interface Allocation {
  municipality: Municipality;
  amount: number;
}

export interface MunicipalAllocations {
  fiscalYear: number;
  allocations: Allocation[];
}

export interface MunicipalAllocationsState {
  municipalAllocations: MunicipalAllocations[];
}

export const DEFAULT_MUNICIPAL_ALLOCATIONS_STATE: MunicipalAllocationsState = {
  municipalAllocations: []
};
