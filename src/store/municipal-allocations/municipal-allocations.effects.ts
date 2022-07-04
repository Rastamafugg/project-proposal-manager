import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {loadMunicipalAllocations, loadMunicipalAllocationsSuccess} from './municipal-allocations.actions';

@Injectable()
export class MunicipalAllocationsEffects {

  constructor(
    private actions$: Actions,
    private restService: RestService
  ) {
  }

  loadMunicipalAllocations$ = createEffect(() => this.actions$.pipe(
    ofType(loadMunicipalAllocations),
    mergeMap((action) => this.restService.getMunicipalAllocations()
      .pipe(
        map(municipalAllocations => (loadMunicipalAllocationsSuccess({municipalAllocations})),
          // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
        ))
    )
  ));
}
