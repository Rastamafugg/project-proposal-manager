import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AnnualExpenditureReportComponent} from './components/annual-expenditure-report/annual-expenditure-report.component';
import {
  AnnualExpenditureReportReconciliationComponent
} from './components/annual-expenditure-report-reconciliation/annual-expenditure-report-reconciliation.component';
import {MunicipalLandingPageComponent} from './components/municipal-landing-page/municipal-landing-page.component';
import {MunicipalContactInformationComponent} from './components/municipal-contact-information/municipal-contact-information.component';
import { RegionalLandingPageComponent } from './components/regional-landing-page/regional-landing-page.component';
import {AdminLandingPageComponent} from './components/admin-landing-page/admin-landing-page.component';
import { MunicipalCipContainerComponent } from './containers/municipal-cip-container/municipal-cip-container.component';
import {ControlsModule} from '../controls/controls.module';
import {environment} from '../environments/environment';
import {staticDataReducer} from '../store/static-data/static-data.reducer';
import {StaticDataEffects} from '../store/static-data/static-data.effects';
import {capitalInvestmentPlanReducer} from '../store/capital-investment-plan/capital-investment-plan.reducer';
import {contactInfoReducer} from '../store/contact-info/contact-info.reducer';
import {CIPEffects} from '../store/capital-investment-plan/capital-investment-plan.effects';
import {ContactInfoEffects} from '../store/contact-info/contact-info.effects';
import {
  CapitalInvestmentPlanEditComponent,
  CapitalInvestmentPlanViewComponent,
} from './components/capital-investment-plan';
import {RegionalCipContainerComponent} from './containers/regional-cip-container/regional-cip-container.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {annualExpenditureReportReducer} from '../store/annual-expenditure-report/annual-expenditure-report.reducer';
import {AEREffects} from '../store/annual-expenditure-report/annual-expenditure-report.effects';
import {MunicipalAllocationsEffects} from '../store/municipal-allocations/municipal-allocations.effects';
import {municipalAllocationsReducer} from '../store/municipal-allocations/municipal-allocations.reducer';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MunicipalReportsComponent} from './components/municipal-reports/municipal-reports.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CanDeactivateGuard} from './directives/can-deactivate-guard/can-deactivate-guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminLandingPageComponent,
    AnnualExpenditureReportComponent,
    AnnualExpenditureReportReconciliationComponent,
    CapitalInvestmentPlanEditComponent,
    CapitalInvestmentPlanViewComponent,
    MunicipalCipContainerComponent,
    MunicipalContactInformationComponent,
    MunicipalLandingPageComponent,
    MunicipalReportsComponent,
    RegionalCipContainerComponent,
    RegionalLandingPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ControlsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      'static-data': staticDataReducer,
      'capital-investment-plan': capitalInvestmentPlanReducer,
      'annual-expenditure-report': annualExpenditureReportReducer,
      'contact-info': contactInfoReducer,
      'municipal-allocations': municipalAllocationsReducer,
    }),
    EffectsModule.forRoot([
      StaticDataEffects,
      CIPEffects,
      AEREffects,
      ContactInfoEffects,
      MunicipalAllocationsEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // StoreModule.forRoot({ cip: cipReducer }),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {
}
