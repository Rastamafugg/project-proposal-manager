import { createSelector } from '@ngrx/store';
import {ApplicationState} from '../index';
import {ContactInfoState} from './contact-info.state';

export const selectContactInfo = (state: ApplicationState) => state['contact-info'];

export const selectAllMunicipalContactInfo = createSelector(
  selectContactInfo,
  (state: ContactInfoState) => state.municipalContactInfo
);

export const selectMunicipalContactInfo = createSelector(
  selectContactInfo,
  (state: ContactInfoState, props) => state.municipalContactInfo.find(currentInfo => currentInfo.municipalCode === props.municipalCode)
);
