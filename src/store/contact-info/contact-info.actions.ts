import {createAction, props} from '@ngrx/store';
import {ContactInfo} from './contact-info.state';

export const loadAllContactInfo = createAction(
  '[Contact Info] Load All',
);

export const loadAllContactInfoSuccess = createAction(
  '[Contact Info] Load All SUCCESS',
  props<{ allContactInfo: ContactInfo[] }>()
);

export const loadContactInfo = createAction(
  '[Contact Info] Load',
  props<{ municipalCode: string }>()
);

export const loadContactInfoSuccess = createAction(
  '[Contact Info] Load SUCCESS',
  props<{ contactInfo: ContactInfo }>()
);

export const updateContactInfo = createAction(
  '[Contact Info] Update',
  props<{ contactInfo: ContactInfo }>()
);

export const updateContactInfoSuccess = createAction(
  '[Contact Info] Update SUCCESS',
  props<{ contactInfo: ContactInfo }>()
);
