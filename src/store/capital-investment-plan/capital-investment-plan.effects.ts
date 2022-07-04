import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import {RestService} from '../../services/rest.service';
import {
  amendCapitalInvestmentPlan,
  amendCapitalInvestmentPlanSuccess,
  createCapitalInvestmentPlan,
  createCapitalInvestmentPlanSuccess, deleteCapitalInvestmentPlan, deleteCapitalInvestmentPlanSuccess,
  loadAllCapitalInvestmentPlans,
  loadAllCapitalInvestmentPlansSuccess,
  loadCapitalInvestmentPlans,
  loadCapitalInvestmentPlansSuccess,
  updateCapitalInvestmentPlan,
  updateCapitalInvestmentPlanSuccess
} from './capital-investment-plan.actions';

@Injectable()
export class CIPEffects {

  constructor(
    private actions$: Actions,
    private restService: RestService
  ) {}

  loadCIPs$ = createEffect(() => this.actions$.pipe(
    ofType(loadCapitalInvestmentPlans),
    mergeMap((action) => this.restService.getAllCIPsForMunicipality(action.municipalCode)
      .pipe(
        map(cips => (loadCapitalInvestmentPlansSuccess({ capitalInvestmentPlans: cips })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadAllCIPs$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllCapitalInvestmentPlans),
    mergeMap((action) => this.restService.getAllCIPs()
      .pipe(
        map(cips => (loadAllCapitalInvestmentPlansSuccess({ capitalInvestmentPlans: cips })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  createCIP$ = createEffect(() => this.actions$.pipe(
    ofType(createCapitalInvestmentPlan),
    mergeMap((action) => this.restService.saveCIP(action.capitalInvestmentPlan)
      .pipe(
        map(cips => (createCapitalInvestmentPlanSuccess({ capitalInvestmentPlans: cips })),
        // catchError(() => updateCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  saveCIP$ = createEffect(() => this.actions$.pipe(
    ofType(updateCapitalInvestmentPlan),
    mergeMap((action) => this.restService.saveCIP(action.capitalInvestmentPlan)
      .pipe(
        map(cips => (updateCapitalInvestmentPlanSuccess({ capitalInvestmentPlans: cips })),
        // catchError(() => updateCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  amendCIP$ = createEffect(() => this.actions$.pipe(
    ofType(amendCapitalInvestmentPlan),
    mergeMap((action) => this.restService.amendCIP(action.capitalInvestmentPlan)
      .pipe(
        map(cips => (amendCapitalInvestmentPlanSuccess({ capitalInvestmentPlans: cips })),
        // catchError(() => amendCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  deleteCIP$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCapitalInvestmentPlan),
    mergeMap((action) => this.restService.deleteCIP(action.capitalInvestmentPlan, action.filterResultsByMunicipality)
      .pipe(
        map(cips => (deleteCapitalInvestmentPlanSuccess({ capitalInvestmentPlans: cips })),
          // catchError(() => updateCapitalInvestmentPlansFailure({ userId: action.userId }))
        ))
    )
  ));
}
