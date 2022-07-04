import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { RestService } from '../../services/rest.service';
import {
  loadProjectObjectives,
  loadProjectTypes,
  loadProjectTypesSuccess,
  loadProjectObjectivesSuccess,
  loadActivityTypes,
  loadActivityTypesSuccess,
  loadFundingSourceTypes,
  loadFundingSourceTypesSuccess,
  loadProgramRequirementsTypesSuccess,
  loadProgramRequirementsTypes,
  loadOutcomesAndPlanningTypes,
  loadOutcomesAndPlanningTypesSuccess,
  loadProjectTimelineActivityTypes,
  loadProjectTimelineActivityTypesSuccess,
  loadMunicipalities,
  loadMunicipalitiesSuccess,
  loadAERActionTypes,
  loadAERActionTypesSuccess,
} from './static-data.actions';
import {Municipality} from './static-data.state';

@Injectable()
export class StaticDataEffects {

  constructor(
    private actions$: Actions,
    private restService: RestService
  ) {}

  loadMunicipalities$ = createEffect(() => this.actions$.pipe(
    ofType(loadMunicipalities),
    mergeMap((action) => this.restService.getMunicipalities()
      .pipe(
        map(municipalities => (loadMunicipalitiesSuccess({ municipalities })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadProjectTypes$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjectTypes),
    mergeMap((action) => this.restService.getProjectTypes()
      .pipe(
        map(projectTypes => (loadProjectTypesSuccess({ projectTypes })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadActivityTypes$ = createEffect(() => this.actions$.pipe(
    ofType(loadActivityTypes),
    mergeMap((action) => this.restService.getActivityTypes()
      .pipe(
        map(activityTypes => (loadActivityTypesSuccess({ activityTypes })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadOutcomesAndPlanningTypes$ = createEffect(() => this.actions$.pipe(
    ofType(loadOutcomesAndPlanningTypes),
    mergeMap((action) => this.restService.getOutcomesAndPlanningTypes()
      .pipe(
        map(outcomesAndPlanningTypes => (loadOutcomesAndPlanningTypesSuccess({ outcomesAndPlanningTypes })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadFundingSourceTypes$ = createEffect(() => this.actions$.pipe(
    ofType(loadFundingSourceTypes),
    mergeMap((action) => this.restService.getFundingSourceTypes()
      .pipe(
        map(fundingSourceTypes => (loadFundingSourceTypesSuccess({ fundingSourceTypes })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadProgramRequirementsTypes$ = createEffect(() => this.actions$.pipe(
    ofType(loadProgramRequirementsTypes),
    mergeMap((action) => this.restService.getProgramRequirementsTypes()
      .pipe(
        map(programRequirementsTypes => (loadProgramRequirementsTypesSuccess({ programRequirementsTypes })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadProjectTimelineActivityTypes$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjectTimelineActivityTypes),
    mergeMap((action) => this.restService.getProjectTimelineActivityTypes()
      .pipe(
        map(projectTimelineActivityTypes => (loadProjectTimelineActivityTypesSuccess({ projectTimelineActivityTypes })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadProjectObjectives$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjectObjectives),
    mergeMap((action) => this.restService.getObjectives()
      .pipe(
        map(objectives => (loadProjectObjectivesSuccess({ objectives })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));

  loadAERActionTypes$ = createEffect(() => this.actions$.pipe(
    ofType(loadAERActionTypes),
    mergeMap((action) => this.restService.getAERActionTypes()
      .pipe(
        map(actionTypes => (loadAERActionTypesSuccess({ actionTypes })),
        // catchError(() => loadCapitalInvestmentPlansFailure({ userId: action.userId }))
      ))
    )
  ));
}
