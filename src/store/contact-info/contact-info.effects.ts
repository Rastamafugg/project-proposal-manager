import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {
  loadAllContactInfo, loadAllContactInfoSuccess,
  loadContactInfo,
  loadContactInfoSuccess,
  updateContactInfo,
  updateContactInfoSuccess
} from './contact-info.actions';
import {Injectable} from '@angular/core';
import {RestService} from '../../services/rest.service';

@Injectable()
export class ContactInfoEffects {

  constructor(
    private actions$: Actions,
    private restService: RestService
  ) {
  }

  loadAllContactInfo$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllContactInfo),
    mergeMap((action) => this.restService.getAllContactInfo()
      .pipe(
        map(allContactInfo => (loadAllContactInfoSuccess({allContactInfo})),
          // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
        ))
    )
  ));

  loadContactInfo$ = createEffect(() => this.actions$.pipe(
    ofType(loadContactInfo),
    mergeMap((action) => this.restService.getContactInfo(action.municipalCode)
      .pipe(
        map(contactInfo => (loadContactInfoSuccess({contactInfo})),
          // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
        ))
    )
  ));

  saveContactInfo$ = createEffect(() => this.actions$.pipe(
    ofType(updateContactInfo),
    mergeMap((action) => this.restService.saveContactInfo(action.contactInfo)
      .pipe(
        map(contactInfo => (updateContactInfoSuccess({contactInfo})),
          // catchError(() => updateCapitalInvestmentPlansFailure({ userId: action.userId }))
        ))
    )
  ));
}
