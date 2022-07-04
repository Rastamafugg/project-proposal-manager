import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UiUtilsService} from '../../../services/ui-utils.service';
import {Location} from '@angular/common';
import {loadCapitalInvestmentPlans} from '../../../store/capital-investment-plan/capital-investment-plan.actions';
import {selectAllCapitalInvestmentPlans} from '../../../store/capital-investment-plan/capital-investment-plan.selectors';
import {CapitalInvestmentPlan} from '../../../store/capital-investment-plan/capital-investment-plan.state';
import {
  loadAnnualExpenditureReportsForMunicipality,
  updateAnnualExpenditureReport
} from '../../../store/annual-expenditure-report/annual-expenditure-report.actions';
import {loadContactInfo} from '../../../store/contact-info/contact-info.actions';
import {selectAERs} from '../../../store/annual-expenditure-report/annual-expenditure-report.selectors';
import {AnnualExpenditureReport} from '../../../store/annual-expenditure-report/annual-expenditure-report.state';
import {ContactInfo} from '../../../store/contact-info/contact-info.state';
import {selectMunicipalContactInfo} from '../../../store/contact-info/contact-info.selectors';
import {FormArray, FormGroup} from '@angular/forms';
import {UserFormComponent} from '../../directives/can-deactivate-guard/user-form-component';
import {MatTable} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-municipal-reports',
  templateUrl: './municipal-reports.component.html',
  styleUrls: ['./municipal-reports.component.scss']
})
export class MunicipalReportsComponent extends UserFormComponent implements OnInit {
  public municipalContactInfo: ContactInfo;
  public plans: CapitalInvestmentPlan[] = [];
  public aers: AnnualExpenditureReport[] = [];
  totalPrevious5YearCommitment = 0;
  totalCurrent5YearCommitment = 0;
  totalOverallCommitment = 0;
  private municipalCode;
  private previous5YearBlock = [];
  private current5YearBlock = [];
  aersForm: FormArray;
  allocationAmountForm: FormGroup;
  showAllocationAmountForm = false;

  @ViewChild('current5YearReport') current5YearReportTable: MatTable<any>;

  private municipalContactInfo$;
  private plans$;
  private aers$;

  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private uiUtils: UiUtilsService,
    private location: Location,
    private snackbar: MatSnackBar,
  ) {
    super();
  }

  hasUnsavedData() {
    return this.aersForm && this.aersForm.dirty;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const municipalCode = params.get('municipalCode');
      this.municipalCode = municipalCode;
      this.store.dispatch(loadContactInfo({municipalCode}));
      this.store.dispatch(loadCapitalInvestmentPlans({municipalCode}));
      this.previous5YearBlock = this.uiUtils.get5YearBlockForFiscalYear(this.uiUtils.getCurrentFiscalYear() - 5);
      this.current5YearBlock = this.uiUtils.get5YearBlockForFiscalYear(this.uiUtils.getCurrentFiscalYear());
      this.store.dispatch(loadAnnualExpenditureReportsForMunicipality({
        municipalCode,
        fiscalYears: [
          // this.previous5YearBlock[0].code - 1, // Add extra year to start to get carryover for previous 5 year block
          ...this.previous5YearBlock.map(current => current.code),
          ...this.current5YearBlock.map(current => current.code)
        ],
      }));

      this.municipalContactInfo$ = this.store.select(state => selectMunicipalContactInfo(state, {municipalCode: this.municipalCode}));
      this.municipalContactInfo$.subscribe(municipalContactInfo => {
        this.municipalContactInfo = municipalContactInfo;
      });
    });

    this.plans$ = this.store.select(state => selectAllCapitalInvestmentPlans(state));
    this.plans$.subscribe(plans => {
      this.plans = plans;
    });

    this.aers$ = this.store.select(state => selectAERs(state));
    this.aers$.subscribe(aers => {
      this.aers = aers;
      this.aersForm = this.uiUtils.createAnnualExpenditureReportsForm(this.aers);
    });
    this.allocationAmountForm = this.uiUtils.createAllocationAmountForm();
  }

  getMunicipalityName() {
    return (this.municipalContactInfo) ? this.municipalContactInfo.municipalName : '';
  }

  getFiscalYearLabel(fiscalYear: any) {
    if (typeof fiscalYear === 'string') {
      fiscalYear = parseInt(fiscalYear, 10);
    }
    return this.uiUtils.getFiscalYearLabel(fiscalYear);
  }

  private createFundsReceivedColumns(yearColumns: string[]) {
    return ['label', ...yearColumns, 'total'];
  }

  getPrevious5YearReportColumns() {
    const yearColumns: string[] = this.previous5YearBlock.map(current => current.code.toString());
    return this.createFundsReceivedColumns(yearColumns);
  }

  getCurrent5YearReportColumns() {
    const yearColumns: string[] = this.current5YearBlock.map(current => current.code.toString());
    return this.createFundsReceivedColumns(yearColumns);
  }

  getPrevious5YearReportTableData() {
    return this.getFundsReceivedTableData(this.getPrevious5YearReportColumns(), 0);
  }

  getCurrent5YearReportTableData() {
    return this.getFundsReceivedTableData(this.getCurrent5YearReportColumns(), 0);
  }

  getFundsReceivedTableData(yearColumns: string[], carryover: number) {
    const tableData = [{}, {}, {}, {}, {}, {}];
    let allocationTotal = 0;
    let interestTotal = 0;
    let allocationInterestTotal = 0;
    let committedTotal = 0;
    let unallocatedTotal = 0;
    for (const [currentIndex, currentColumn] of yearColumns.entries()) {
      if (currentIndex === 0) {
        tableData[0][currentColumn] = `Committed & Uncommitted Carry Over From FY ${this.uiUtils.getFiscalYearLabel(parseInt(yearColumns[1], 10) - 1)}`;
        tableData[1][currentColumn] = 'Allocation Funding';
        tableData[2][currentColumn] = 'Plus Interest Earned';
        tableData[3][currentColumn] = 'Grand Total';
        tableData[4][currentColumn] = 'Total CIP Commitments';
        tableData[5][currentColumn] = 'Outstanding Unallocated';
      } else if (currentIndex > 0 && currentIndex < yearColumns.length - 1) {
        if (currentIndex === 1) {
          tableData[0][currentColumn] = carryover;
        } else {
          tableData[0][currentColumn] = 0;
        }
        const currentYear = parseInt(currentColumn, 10);
        const currentAER = this.aersForm.controls.find(currentAer => currentAer.value.fiscalYear === currentYear)?.value;
        tableData[1][currentColumn] = currentAER ? currentAER.allocationReceived : 0;
        tableData[2][currentColumn] = currentAER ? currentAER.allocationInterest : 0;
        tableData[3][currentColumn] = tableData[0][currentColumn] + tableData[1][currentColumn] + tableData[2][currentColumn];
        let currentCommitted = 0;
        let currentUnallocated = tableData[3][currentColumn];
        for (const currentCip of currentAER.capitalInvestmentPlans) {
          const committedForFiscalYear = currentCip.gasTaxExpenditureTimeline.find(currentEntry => currentEntry.year === currentYear);
          if (committedForFiscalYear) {
            if (currentYear >= this.uiUtils.getCurrentFiscalYear()) {
              currentCommitted += committedForFiscalYear.plannedAmount;
              currentUnallocated -= committedForFiscalYear.plannedAmount;
            } else {
              currentCommitted += committedForFiscalYear.plannedAmount;
              currentUnallocated -= committedForFiscalYear.plannedAmount;
              // TODO: fix after actualAmount works
              // currentCommitted += committedForFiscalYear.actualAmount;
              // currentUnallocated -= committedForFiscalYear.actualAmount;
            }
          }
        }
        tableData[4][currentColumn] = currentCommitted;
        tableData[5][currentColumn] = currentUnallocated;
        allocationTotal += tableData[1][currentColumn];
        interestTotal += tableData[2][currentColumn];
        allocationInterestTotal += tableData[3][currentColumn];
        committedTotal += tableData[4][currentColumn];
        unallocatedTotal += tableData[5][currentColumn];
      } else { // 5 Year Block Totals
        tableData[0][currentColumn] = 0;
        tableData[1][currentColumn] = allocationTotal;
        tableData[2][currentColumn] = interestTotal;
        tableData[3][currentColumn] = allocationInterestTotal;
        tableData[4][currentColumn] = committedTotal;
        tableData[5][currentColumn] = unallocatedTotal;
      }
    }
    return tableData;
  }

  getCIPCommitmentsReportColumns() {
    return ['projectName', 'projectNumber', 'projectStatus', 'previous5YearCommitment', 'current5YearCommitment', 'totalCommitment'];
  }

  getCIPCommitmentsReportTableData() {
    this.totalPrevious5YearCommitment = 0;
    this.totalCurrent5YearCommitment = 0;
    this.totalOverallCommitment = 0;
    const tableData = [];
    const previous5Years = this.previous5YearBlock.map(current => current.code);
    const current5Years = this.current5YearBlock.map(current => current.code);
    for (const cip of this.plans) {
      let previous5YearTotal = 0;
      let current5YearTotal = 0;
      for (const fiscalYearEntry of cip.gasTaxExpenditureTimeline) {
        if (previous5Years.includes(fiscalYearEntry.year)) {
          previous5YearTotal += fiscalYearEntry.plannedAmount;
        } else if (current5Years.includes(fiscalYearEntry.year)) {
          current5YearTotal += fiscalYearEntry.plannedAmount;
        }
      }
      this.totalPrevious5YearCommitment += previous5YearTotal;
      this.totalCurrent5YearCommitment += current5YearTotal;
      this.totalOverallCommitment += previous5YearTotal + current5YearTotal;
      tableData.push({
        projectName: cip.projectTitle,
        projectNumber: cip.projectNumber,
        projectStatus: cip.state,
        previous5YearCommitment: previous5YearTotal,
        current5YearCommitment: current5YearTotal,
        totalCommitment: previous5YearTotal + current5YearTotal,
      });
    }
    return tableData;
  }

  getStateText(stateCode) {
    return this.uiUtils.getCIPStateText(stateCode);
  }

  goToPreviousPage() {
    this.location.back();
  }

  printPage() {
    window.print();
  }

  editAllocationAmount(year: string, amount: number) {
    this.allocationAmountForm.get('fiscalYear').setValue(parseInt(year, 10));
    this.allocationAmountForm.get('allocationReceived').setValue(amount);
    this.allocationAmountForm.get('applyForward').setValue(false);
    this.showAllocationAmountForm = true;
  }

  saveAllocationAmount() {
    const result = this.allocationAmountForm.value;
    let targetYear = result.fiscalYear;
    let targetAER = this.aersForm.controls.find(currentAer => currentAer.value.fiscalYear === targetYear);
    do {
      targetAER.get('allocationReceived').setValue(result.allocationReceived);
      targetAER.get('allocationReceived').markAsDirty();
      if (result.applyForward) {
        targetYear += 1;
        targetAER = this.aersForm.controls.find(currentAer => currentAer.value.fiscalYear === targetYear);
      } else {
        targetAER = null;
      }
    } while (targetAER); // Repeat until targetAER is null
    this.showAllocationAmountForm = false;
    this.allocationAmountForm.reset();
    this.current5YearReportTable.renderRows();
  }

  cancelAllocationAmount() {
    this.showAllocationAmountForm = false;
  }

  getAllocationAmountFormClasses() {
    return (this.showAllocationAmountForm) ? 'allocation-amount-form' : 'allocation-amount-form hidden';
  }

  submitAERs() {
    for (const aerForm of this.aersForm.controls) {
      if (aerForm.dirty) {
        const aer: AnnualExpenditureReport = aerForm.value;
        this.store.dispatch(updateAnnualExpenditureReport({annualExpenditureReport: aer}));
      }
    }
    this.snackbar.open('Save Success', null, {
      duration: 2000
    });
    this.aersForm.reset();
    this.goToPreviousPage();
  }
}
