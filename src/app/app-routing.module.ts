import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MunicipalLandingPageComponent} from './components/municipal-landing-page/municipal-landing-page.component';
import {AnnualExpenditureReportComponent} from './components/annual-expenditure-report/annual-expenditure-report.component';
import {MunicipalContactInformationComponent} from './components/municipal-contact-information/municipal-contact-information.component';
import {
  AnnualExpenditureReportReconciliationComponent
} from './components/annual-expenditure-report-reconciliation/annual-expenditure-report-reconciliation.component';
import {RegionalLandingPageComponent} from './components/regional-landing-page/regional-landing-page.component';
import {AdminLandingPageComponent} from './components/admin-landing-page/admin-landing-page.component';
import {MunicipalCipContainerComponent} from './containers/municipal-cip-container/municipal-cip-container.component';
import {RegionalCipContainerComponent} from './containers/provincial-cip-container/regional-cip-container.component';
import {MunicipalReportsComponent} from './components/municipal-reports/municipal-reports.component';
import {CanDeactivateGuard} from './directives/can-deactivate-guard/can-deactivate-guard';

const routes: Routes = [
  { path: '', component: AdminLandingPageComponent },
  {
    path: 'municipal/:municipalCode',
    children: [
      {path: '', component: MunicipalLandingPageComponent},
      {path: 'contact', component: MunicipalContactInformationComponent, canDeactivate: [CanDeactivateGuard]},
      {path: 'cip/:actionType', component: MunicipalCipContainerComponent, canDeactivate: [CanDeactivateGuard]},
      {
        path: 'cip/:actionType/:projectNumber/:projectVersion',
        component: MunicipalCipContainerComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {path: 'aer/:actionType/:fiscalYear', component: AnnualExpenditureReportComponent, canDeactivate: [CanDeactivateGuard]},
    ]
  },
  {
    path: 'provincial',
    children: [
      {path: '', component: RegionalLandingPageComponent},
      {
        path: 'cip/:actionType/:municipalCode/:projectNumber/:projectVersion',
        component: RegionalCipContainerComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'aer-reconciliation/:municipalCode/:fiscalYear',
        component: AnnualExpenditureReportReconciliationComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {path: 'municipal-reports/:municipalCode', component: MunicipalReportsComponent, canDeactivate: [CanDeactivateGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
