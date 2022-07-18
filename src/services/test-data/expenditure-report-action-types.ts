import {CodeType} from '../../store/static-data/static-data.state';

export const EXPENDITURE_REPORT_ACTION_TYPES: CodeType[] = [
  {
    code: 'EMAIL',
    label: 'Email Sent',
  },
  {
    code: 'PHONE',
    label: 'Phone Call Made',
  },
  {
    code: 'RESPONSE',
    label: 'Response Received',
  },
];
