import {createReducer, on} from '@ngrx/store';
import {DEFAULT_CONTACT_INFO_STATE} from './contact-info.state';
import {loadAllContactInfoSuccess, loadContactInfoSuccess, updateContactInfoSuccess} from './contact-info.actions';

const REDUCER = createReducer(DEFAULT_CONTACT_INFO_STATE,
  on(loadAllContactInfoSuccess, (state, action) => {
    return {
      ...state,
      municipalContactInfo: action.allContactInfo,
    };
  }),
  on(loadContactInfoSuccess, (state, action) => {
    const updatedContactInfo = [];
    let addedInfo = false;
    for (const currentInfo of state.municipalContactInfo) {
      if (currentInfo.municipalCode === action.contactInfo.municipalCode) {
        updatedContactInfo.push(action.contactInfo);
        addedInfo = true;
      } else {
        updatedContactInfo.push(currentInfo);
      }
    }
    if (!addedInfo) { // If contact info is loaded for the first time
      updatedContactInfo.push(action.contactInfo);
    }
    return {
      ...state,
      municipalContactInfo: updatedContactInfo,
    };
  }),
  on(updateContactInfoSuccess, (state, action) => {
    const updatedContactInfo = [];
    for (const currentInfo of state.municipalContactInfo) {
      if (currentInfo.municipalCode === action.contactInfo.municipalCode) {
        updatedContactInfo.push(action.contactInfo);
      } else {
        updatedContactInfo.push(currentInfo);
      }
    }
    return {
      ...state,
      municipalContactInfo: updatedContactInfo,
    };
  }),
);

export function contactInfoReducer(state, action) {
  return REDUCER(state, action);
}
