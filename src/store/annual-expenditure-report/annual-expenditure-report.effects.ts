import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import {RestService} from '../../services/rest.service';
import {
  loadAnnualExpenditureReport,
  loadAnnualExpenditureReportsForFiscalYear,
  loadAnnualExpenditureReportsForFiscalYearSuccess,
  loadAnnualExpenditureReportsForMunicipality,
  loadAnnualExpenditureReportsForMunicipalitySuccess,
  loadAnnualExpenditureReportSuccess, updateAnnualExpenditureReport, updateAnnualExpenditureReportSuccess
} from './annual-expenditure-report.actions';

@Injectable()
export class AEREffects {

  constructor(
    private actions$: Actions,
    private restService: RestService
  ) {}

  loadAER$ = createEffect(() => this.actions$.pipe(
    ofType(loadAnnualExpenditureReport),
    mergeMap((action) => this.restService.getAERForMunicipality(action.municipalCode, action.fiscalYear)
      .pipe(
        map(aer => (loadAnnualExpenditureReportSuccess({ annualExpenditureReport: aer })),
        ))
    )
  ));

  loadAnnualExpenditureReportsForMunicipality$ = createEffect(() => this.actions$.pipe(
    ofType(loadAnnualExpenditureReportsForMunicipality),
    mergeMap((action) => this.restService.getAERsForMunicipality(action.municipalCode, action.fiscalYears)
      .pipe(
        map(aers => (loadAnnualExpenditureReportsForMunicipalitySuccess({ annualExpenditureReports: aers })),
        ))
    )
  ));

  loadAnnualExpenditureReportsForFiscalYear$ = createEffect(() => this.actions$.pipe(
    ofType(loadAnnualExpenditureReportsForFiscalYear),
    mergeMap((action) => this.restService.getAERsForFiscalYear(action.fiscalYear)
      .pipe(
        map(aers => (loadAnnualExpenditureReportsForFiscalYearSuccess({ annualExpenditureReports: aers })),
        ))
    )
  ));

  saveAER$ = createEffect(() => this.actions$.pipe(
    ofType(updateAnnualExpenditureReport),
    mergeMap((action) => this.restService.saveAER(action.annualExpenditureReport)
      .pipe(
        map(aer => (updateAnnualExpenditureReportSuccess({ annualExpenditureReport: aer })),
        ))
    )
  ));
}
