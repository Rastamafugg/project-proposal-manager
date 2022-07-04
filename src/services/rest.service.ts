import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {CapitalInvestmentPlan, PlanState} from '../store/capital-investment-plan/capital-investment-plan.state';
import {ContactInfo} from '../store/contact-info/contact-info.state';
import {
  ACTIVITY_TYPES,
  EXPENDITURE_REPORT_ACTION_TYPES,
  FUNDING_SOURCE_TYPES,
  INITIAL_CIPS,
  INITIAL_CONTACT_INFO,
  MUNICIPALITIES,
  OBJECTIVES,
  OUTCOMES_AND_PLANNING_TYPES,
  PROGRAM_REQUIREMENTS_TYPES,
  PROJECT_TIMELINE_ACTIVITY_TYPES,
  PROJECT_TYPES
} from './test-data';
import {INITIAL_AER} from './test-data/expenditure-reports';
import {AnnualExpenditureReport, ReportState} from '../store/annual-expenditure-report/annual-expenditure-report.state';
import {UiUtilsService} from './ui-utils.service';
import {MunicipalAllocations} from '../store/municipal-allocations/municipal-allocations.state';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  cips: CapitalInvestmentPlan[] = [ ...INITIAL_CIPS ];
  aers: AnnualExpenditureReport[] = [ ...INITIAL_AER ];
  contactInfo: ContactInfo[] = [ ...INITIAL_CONTACT_INFO ];

  constructor(
    private uiUtils: UiUtilsService,
  ) {}

  getMunicipalities() {
    return of(MUNICIPALITIES);
  }

  getProjectTypes() {
    return of(PROJECT_TYPES);
  }

  getActivityTypes() {
    return of(ACTIVITY_TYPES);
  }

  getOutcomesAndPlanningTypes() {
    return of(OUTCOMES_AND_PLANNING_TYPES);
  }

  getFundingSourceTypes() {
    return of(FUNDING_SOURCE_TYPES);
  }

  getProgramRequirementsTypes() {
    return of(PROGRAM_REQUIREMENTS_TYPES);
  }

  getProjectTimelineActivityTypes() {
    return of(PROJECT_TIMELINE_ACTIVITY_TYPES);
  }

  getObjectives() {
    return of(OBJECTIVES);
  }

  getAERActionTypes() {
    return of(EXPENDITURE_REPORT_ACTION_TYPES);
  }

  getTimelineRangeForYear(year: number) {
    const startYear = year - (year % 5);
    return [
      startYear,
      startYear + 1,
      startYear + 2,
      startYear + 3,
      startYear + 4,
    ];
  }

  getAllCIPs() {
    return of([...this.cips]);
  }

  private getCIPsForMunicipality(municipalCode: string) {
    return this.cips.filter(currentProject => currentProject.municipalCode === municipalCode);
  }

  getAllCIPsForMunicipality(municipalCode: string) {
    return of(this.getCIPsForMunicipality(municipalCode));
  }

  saveCIP(cip: CapitalInvestmentPlan) {
    const foundCIP = this.updateCip(cip);
    if (!foundCIP) {
      const newCip = {
        ...cip,
        projectNumber: this.getNextProjectNumber(cip.municipalCode),
        version: 1,
        state: PlanState.DRAFT,
      };
      this.cips.push(newCip);
    }
    return of(this.getCIPsForMunicipality(cip.municipalCode));
  }

  amendCIP(cip: CapitalInvestmentPlan) {
    if (cip.projectNumber) {
      const cipIndex = this.cips.findIndex(currentCIP => (
        currentCIP.municipalCode === cip.municipalCode
        && currentCIP.projectNumber === cip.projectNumber
        && currentCIP.version === cip.version
      ));
      if (cipIndex > -1) {
        this.cips[cipIndex] = {
          ...cip,
          version: cip.version + 1,
          state: PlanState.DRAFT,
        };
      }
    }
    return of(this.getCIPsForMunicipality(cip.municipalCode));
  }

  deleteCIP(cip: CapitalInvestmentPlan, filterResultsByMunicipality: boolean) {
    if (cip.projectNumber) {
      const cipIndex = this.cips.findIndex(currentCIP => (
        currentCIP.municipalCode === cip.municipalCode
        && currentCIP.projectNumber === cip.projectNumber
        && currentCIP.version === cip.version
      ));
      this.cips.splice(cipIndex, 1);
    }
    return filterResultsByMunicipality ? of(this.getCIPsForMunicipality(cip.municipalCode)) : of(this.cips);
  }

  private getAER(municipalCode: string, fiscalYear: number) {
    let aer: AnnualExpenditureReport
      = this.aers.find(current => current.municipalCode === municipalCode && current.fiscalYear === fiscalYear);
    if (!aer) {
      aer = {
        municipalCode,
        fiscalYear,
        reportState: ReportState.DRAFT,
        actions: [],
        allocationReceived: 100000,
        allocationInterest: 0,
        capitalInvestmentPlans: [],
      };
      this.aers.push(aer);
    }
    const cips = this.cips.filter(
      current => current.municipalCode === municipalCode && current.gasTaxExpenditureTimeline.find(entry => entry.year === fiscalYear)
    );
    aer = {
      ...aer,
      capitalInvestmentPlans: cips,
    };

    return aer;
  }

  getAERsForFiscalYear(fiscalYear: number) {
    const allAers = [];
    for (const currentMunicipality of MUNICIPALITIES) {
      const aerFound = this.getAER(currentMunicipality.code, fiscalYear);
      if (aerFound) { allAers.push(aerFound); }
    }
    return of(allAers);
  }

  getAERForMunicipality(municipalCode: string, fiscalYear: number) {
    return of(this.getAER(municipalCode, fiscalYear));
  }

  getAERsForMunicipality(municipalCode: string, fiscalYears: number[]) {
    const aers = [];
    for (const currentYear of fiscalYears) {
      const aerFound = this.getAER(municipalCode, currentYear);
      if (aerFound) { aers.push(aerFound); }
    }
    return of(aers);
  }

  saveAER(aer: AnnualExpenditureReport) {
    return of(this.updateAER(aer));
  }

  saveAERs(aers: AnnualExpenditureReport[]) {
    for (const aer of aers) {
      this.updateAER(aer);
    }
    return of(aers);
  }

  private updateAER(aer: AnnualExpenditureReport) {
    const updatedAerIndex
      = this.aers.findIndex(current => current.municipalCode === aer.municipalCode && current.fiscalYear === aer.fiscalYear);
    this.aers.splice(updatedAerIndex, 1, aer);
    for (const plan of aer.capitalInvestmentPlans) {
      this.updateCip(plan);
    }
    return aer;
  }

  getAllContactInfo() {
    return of(this.contactInfo);
  }

  getContactInfo(municipalCode: string) {
    return of(this.contactInfo.find(currentInfo => currentInfo.municipalCode === municipalCode));
  }

  saveContactInfo(info: ContactInfo) {
    const contactIndex = this.contactInfo.findIndex(currentInfo => currentInfo.municipalCode === info.municipalCode);
    this.contactInfo.splice(contactIndex, 1, info);
    return this.getContactInfo(info.municipalCode);
  }

  private updateCip(cip: CapitalInvestmentPlan) {
    if (cip.projectNumber) {
      const cipIndex = this.cips.findIndex(currentCIP => (
        currentCIP.municipalCode === cip.municipalCode
        && currentCIP.projectNumber === cip.projectNumber
        && currentCIP.version === cip.version
      ));
      if (cipIndex > -1) {
        this.cips.splice(cipIndex, 1, cip);
        return true;
      }
    }
    return false;
  }

  getMunicipalAllocations() {
    const municipalities = MUNICIPALITIES;
    const current5YearBlock = this.uiUtils.get5YearBlockForFiscalYear(this.uiUtils.getCurrentFiscalYear());
    const allocations = [];
    for (const fiscalYear of current5YearBlock) {
      allocations.push({
        fiscalYear: parseInt(fiscalYear.code, 10),
        allocations: municipalities.map(currentMunicipality => {
          const aer = this.getAER(currentMunicipality.code, parseInt(fiscalYear.code, 10));
          return {
            municipality: currentMunicipality,
            amount: aer.allocationReceived,
          };
        })
      });
    }
    return of(allocations);
  }

  private getNextProjectNumber(municipalCode: string): string {
    const municipality = MUNICIPALITIES.find(current => current.code === municipalCode);
    const fiveYearBlockNumber = Math.floor(parseInt((this.uiUtils.getCurrentFiscalYear() + 6).toString(10).substr(2, 2), 10) / 5);
    const municipalCIPs = this.cips.filter(current => current.municipalCode === municipalCode
      && current.projectNumber.startsWith(`${municipality.prefix}.${fiveYearBlockNumber}`)
      && current.version === 1);
    return `${municipality.prefix}.${fiveYearBlockNumber}.${municipalCIPs.length + 1}`;
  }
}
