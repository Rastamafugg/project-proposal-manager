import {
  AnnualExpenditureReport,
  ReportState
} from '../../store/annual-expenditure-report/annual-expenditure-report.state';
import {EXPENDITURE_REPORT_ACTION_TYPES} from './expenditure-report-action-types';

export const INITIAL_AER: AnnualExpenditureReport[] = [
  {
    municipalCode: '0001',
    fiscalYear: 2019,
    reportState: ReportState.APPROVED,
    actions: [
      {
        id: 1,
        actionType: EXPENDITURE_REPORT_ACTION_TYPES[0],
        date: new Date('2019/08/09'),
        description: 'Emailed CAO',
      }
    ],
    allocationReceived: 100000,
    allocationInterest: 0,
    capitalInvestmentPlans: [],
  },
  {
    municipalCode: '0001',
    fiscalYear: 2020,
    reportState: ReportState.DRAFT,
    actions: [
      {
        id: 1,
        actionType: EXPENDITURE_REPORT_ACTION_TYPES[0],
        date: new Date('2020/08/09'),
        description: 'Emailed CAO',
      }
    ],
    allocationReceived: 100000,
    allocationInterest: 0,
    capitalInvestmentPlans: [],
  },
];

