import {Component, OnInit} from '@angular/core';
import {
  CapitalInvestmentPlan,
  CIPAction,
  PlanState
} from '../../../store/capital-investment-plan/capital-investment-plan.state';
import {CodeType, ProjectObjective} from '../../../store/static-data/static-data.state';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RestService} from '../../../services/rest.service';
import {switchMap} from 'rxjs/operators';
import {
  amendCapitalInvestmentPlan, createCapitalInvestmentPlan,
  loadCapitalInvestmentPlans,
  updateCapitalInvestmentPlan
} from '../../../store/capital-investment-plan/capital-investment-plan.actions';
import {
  selectCapitalInvestmentPlan,
  selectMunicipalCapitalInvestmentPlans
} from '../../../store/capital-investment-plan/capital-investment-plan.selectors';
import {
  loadActivityTypes,
  loadFundingSourceTypes,
  loadOutcomesAndPlanningTypes,
  loadProgramRequirementsTypes,
  loadProjectObjectives,
  loadProjectTimelineActivityTypes,
  loadProjectTypes
} from '../../../store/static-data/static-data.actions';
import {
  selectActivityTypes,
  selectFundingSourceTypes,
  selectOutcomesAndPlanningTypes,
  selectProgramRequirementsTypes,
  selectProjectObjectives,
  selectProjectTimelineActivityTypes,
  selectProjectTypes
} from '../../../store/static-data/static-data.selectors';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {loadContactInfo} from '../../../store/contact-info/contact-info.actions';
import {selectMunicipalContactInfo} from '../../../store/contact-info/contact-info.selectors';
import {ContactInfo} from '../../../store/contact-info/contact-info.state';
import {UserFormComponent} from '../../directives/can-deactivate-guard/user-form-component';

@Component({
  selector: 'app-regional-cip-container',
  templateUrl: './regional-cip-container.component.html',
  styleUrls: ['./regional-cip-container.component.scss']
})
export class RegionalCipContainerComponent extends UserFormComponent implements OnInit {
  CIPAction = CIPAction;
  municipalCode;
  projectNumber;
  version;
  actionType;
  canLeavePage = true;
  targetCIP$: Observable<CapitalInvestmentPlan> = this.route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      this.municipalCode = params.get('municipalCode');
      this.projectNumber = params.get('projectNumber');
      this.version = params.get('projectVersion');
      this.store.dispatch(loadCapitalInvestmentPlans({municipalCode: this.municipalCode}));

      return this.store.select(state => selectCapitalInvestmentPlan(state, {
        projectNumber: this.projectNumber,
        version: this.version,
      }));
    })
  );
  municipalContactInfo$: Observable<ContactInfo>;
  allMunicipalCips$: Observable<CapitalInvestmentPlan[]>;
  projectTypes$: Observable<CodeType[]> = this.store.select(state => selectProjectTypes(state));
  activityTypes$: Observable<CodeType[]> = this.store.select(state => selectActivityTypes(state));
  outcomesAndPlanningTypes$: Observable<CodeType[]> = this.store.select(state => selectOutcomesAndPlanningTypes(state));
  fundingSourceTypes$: Observable<CodeType[]> = this.store.select(state => selectFundingSourceTypes(state));
  programRequirementsTypes$: Observable<CodeType[]> = this.store.select(state => selectProgramRequirementsTypes(state));
  projectTimelineActivityTypes$: Observable<CodeType[]> = this.store.select(state => selectProjectTimelineActivityTypes(state));
  categories$: Observable<ProjectObjective[]> = this.store.select(state => selectProjectObjectives(state));

  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private restService: RestService,
    private location: Location,
    private snackbar: MatSnackBar,
  ) {
    super();
  }

  hasUnsavedData() {
    return !this.canLeavePage;
  }

  setCanLeavePage(hasUnsavedData: boolean) {
    this.canLeavePage = !hasUnsavedData;
  }

  ngOnInit() {
    this.municipalCode = this.route.snapshot.paramMap.get('municipalCode');
    this.actionType = this.route.snapshot.paramMap.get('actionType');
    this.store.dispatch(loadContactInfo({municipalCode: this.municipalCode}));
    this.store.dispatch(loadProjectTypes());
    this.store.dispatch(loadActivityTypes());
    this.store.dispatch(loadOutcomesAndPlanningTypes());
    this.store.dispatch(loadFundingSourceTypes());
    this.store.dispatch(loadProgramRequirementsTypes());
    this.store.dispatch(loadProjectTimelineActivityTypes());
    this.store.dispatch(loadProjectObjectives());
    this.municipalContactInfo$ = this.store.select(state => selectMunicipalContactInfo(state, {municipalCode: this.municipalCode}));
    this.allMunicipalCips$ = this.store.select(state => selectMunicipalCapitalInvestmentPlans(state, {municipalCode: this.municipalCode}));
  }

  saveCip(cip: CapitalInvestmentPlan) {
    if (cip.projectNumber !== this.projectNumber) {
      // CIP is being updated as result of a transfer of funds from the target CIP
      if (cip.state === PlanState.SUBMITTED) {
        // Return to DRAFT state to be reviewed by submitter
        cip.state = PlanState.DRAFT;
      }
      if (cip.state === PlanState.WITHDRAWAL_REQUESTED) {
        // Return to APPROVED state so the CIP will be amended and the version will increment
        cip.state = PlanState.APPROVED;
      }
      if (cip.state === PlanState.DRAFT) {
        this.store.dispatch(updateCapitalInvestmentPlan({capitalInvestmentPlan: cip}));
      } else if (cip.state === PlanState.APPROVED) {
        this.store.dispatch(amendCapitalInvestmentPlan({capitalInvestmentPlan: cip}));
      }
      // Other states (COMPLETED, WITHDRAWN, REJECTED, REPLACED) cannot be modified.
    } else {
      if (this.actionType === CIPAction.EDIT) {
        this.store.dispatch(updateCapitalInvestmentPlan({capitalInvestmentPlan: cip}));
      } else if (this.actionType === CIPAction.AMEND) {
        this.store.dispatch(amendCapitalInvestmentPlan({capitalInvestmentPlan: cip}));
      } else if (this.actionType === CIPAction.NEW) {
        this.store.dispatch(createCapitalInvestmentPlan({capitalInvestmentPlan: cip}));
      }
      this.snackbar.open('Save Success', null, {
        duration: 2000
      });
      this.goToPreviousPage();
    }
  }

  isActionType(action: CIPAction) {
    return this.actionType && this.actionType === action;
  }

  goToPreviousPage() {
    this.location.back();
  }

  printPage() {
    window.print();
  }
}
