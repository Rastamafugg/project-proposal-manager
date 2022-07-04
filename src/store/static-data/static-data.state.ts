export interface CodeType {
  code: string;
  label: string;
}

export interface Municipality extends CodeType {
  prefix: string;
  government: string;
  county: string;
}

export interface ProjectObjective {
  code: string;
  text: string;
  description: string;
  indicators: string[];
  'national-objectives': string;
}

export interface StaticDataState {
  'municipalities': Municipality[];
  'project-types': CodeType[];
  'activity-types': CodeType[];
  'outcomes-and-planning-types': CodeType[];
  'funding-source-types': CodeType[];
  'program-requirements-types': CodeType[];
  'project-timeline-activity-types': CodeType[];
  'project-objectives': ProjectObjective[];
  'aer-action-types': CodeType[];
}

export const DEFAULT_STATIC_DATA_STATE: StaticDataState = {
  municipalities: [],
  'project-types': [],
  'activity-types': [],
  'outcomes-and-planning-types': [],
  'funding-source-types': [],
  'program-requirements-types': [],
  'project-timeline-activity-types': [],
  'project-objectives': [],
  'aer-action-types': [],
};
