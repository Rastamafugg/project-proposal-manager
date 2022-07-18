import {CodeType} from '../../store/static-data/static-data.state';

export const PROJECT_TIMELINE_ACTIVITY_TYPES: CodeType[] = [
  {
    code: 'TIMELINE-Design/Engineering',
    label: 'Tender or Request for Quotation Date',
  },
  {
    code: 'TIMELINE-Construction/Demolition',
    label: 'Tender or Request Award Date',
  },
  {
    code: 'TIMELINE-Contingency',
    label: 'Design/Engineering Date',
  },
  {
    code: 'TIMELINE-Other',
    label: 'Other',
  },
  {
    code: 'TIMELINE-ACTIVITY-05',
    label: 'Expected Project Start and Completion Dates',
  },
];
