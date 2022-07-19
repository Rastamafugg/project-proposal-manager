import {CapitalInvestmentPlan, PlanState} from '../../store/capital-investment-plan/capital-investment-plan.state';

export let INITIAL_CIPS: CapitalInvestmentPlan[] = [
  {
    municipalCode: '0001',
    projectTitle: 'Hobbiton Bridge',
    projectNumber: '2022.1',
    version: 1,
    state: PlanState.SUBMITTED,
    projectDescription: `Build a replacement bridge crossing The Water in Hobbiton`,
    projectLocation: '1 By The Water, Hobbiton',
    projectMunicipality: 'Hobbiton',
    projectPostalCode: 'H0B 8I7',
    projectType: 'RENEWAL',
    councilResolutionMailed: true,
    dateOfResolution: new Date('2022/04/31'),
    costBreakdown: [
      {
        id: 1,
        activityType: 'Design/Engineering',
        amount: 10000,
      },
      {
        id: 2,
        activityType: 'Construction/Demolition',
        amount: 10000,
      },
      {
        id: 3,
        activityType: 'Contingency',
        amount: 10000,
      },
      {
        id: 4,
        activityType: 'Other',
        amount: 10000,
      },
    ],
    gasTaxExpenditureTimeline: [
      {year: 2019, plannedAmount: 10000, actualAmount: 0},
      {year: 2022, plannedAmount: 15000, actualAmount: 0},
      {year: 2021, plannedAmount: 20000, actualAmount: 0},
      {year: 2022, plannedAmount: 40000, actualAmount: 0},
      {year: 2023, plannedAmount: 15000, actualAmount: 0},
    ],
    proposedSourcesOfFunding: [
      {
        id: 1,
        fundingSource: 'Ale Tax Fund',
        program: null,
        confirmed: true,
        amount: 10000,
      },
      {
        id: 2,
        fundingSource: 'Applicant\'s Share',
        program: null,
        confirmed: true,
        amount: 10000,
      },
      {
        id: 3,
        fundingSource: 'Shire Regional Source',
        program: 'Test Regional Program',
        confirmed: false,
        amount: 10000,
      },
      {
        id: 4,
        fundingSource: 'Other Source',
        program: 'Test Program',
        confirmed: true,
        amount: 10000,
      },
    ],
    projectTimelines: [
      {
        id: 1,
        activity: 'TIMELINE-Design/Engineering',
        startDate: new Date('2022/01/01'),
        completionDate: new Date('2022/01/15'),
      },
      {
        id: 2,
        activity: 'TIMELINE-Construction/Demolition',
        startDate: new Date('2022/01/16'),
        completionDate: new Date('2022/01/16'),
      },
      {
        id: 3,
        activity: 'TIMELINE-Contingency',
        startDate: new Date('2022/01/17'),
        completionDate: new Date('2022/02/01'),
      },
      {
        id: 4,
        activity: 'TIMELINE-Other',
        startDate: new Date('2022/02/01'),
        completionDate: new Date('2022/03/01'),
      },
      {
        id: 5,
        activity: 'TIMELINE-ACTIVITY-05',
        startDate: new Date('2022/01/01'),
        completionDate: new Date('2022/03/01'),
      },
    ],
    outcomesAndPlanning: [
      {
        code: 'OUTCOME-01',
        selected: true,
      },
      {
        code: 'OUTCOME-02',
        selected: false,
      },
      {
        code: 'OUTCOME-03',
        selected: true,
      },
      {
        code: 'OUTCOME-04',
        selected: false,
      },
      {
        code: 'OUTCOME-05',
        selected: false,
      },
      {
        code: 'OUTCOME-06',
        selected: false,
      },
      {
        code: 'OUTCOME-07',
        selected: false,
      },
      {
        code: 'OUTCOME-08',
        selected: false,
      },
      {
        code: 'OUTCOME-09',
        selected: false,
      },
      {
        code: 'OUTCOME-10',
        selected: false,
      },
      {
        code: 'OUTCOME-11',
        selected: false,
      },
    ],
    scheduleHIndicators: [
      {
        projectCategoryCode: 'disaster-mitigation-infrastructure',
        outcomes: [
          {
            code: '% of services projected to be protected due to the new mitigation infrastructure',
            selected: true,
          },
          {
            code: '% of properties projected to be less at-risk due to the new mitigation infrastructure',
            selected: true,
          },
          {
            code: '# or % of population projected to be less at-risk due to the new mitigation infrastructure',
            selected: false,
          },
          {
            code: '$ of Disaster Financial Assistance Arrangement funding and/or emergency response costs estimated to be reduced due to the new mitigation infrastructure, based on a previous or comparable event',
            selected: false,
          },
          {
            code: '% of at-risk infrastructure that is better protected as a result of the new mitigation infrastructure',
            selected: false,
          },
          {
            code: '% of mitigation plan that is implemented',
            selected: false,
          },
        ],
      }
    ],
    programRequirements: [
      {
        code: 'REQUIREMENT-01',
        selected: true,
      },
      {
        code: 'REQUIREMENT-02',
        selected: false,
      },
      {
        code: 'REQUIREMENT-03',
        selected: false,
      },
      {
        code: 'REQUIREMENT-04',
        selected: true,
      },
      {
        code: 'REQUIREMENT-05',
        selected: false,
      },
      {
        code: 'REQUIREMENT-06',
        selected: false,
      },
      {
        code: 'REQUIREMENT-07',
        selected: false,
      },
      {
        code: 'REQUIREMENT-08',
        selected: false,
      },
    ],
  },
  {
    municipalCode: '0001',
    projectTitle: 'Mill Upgrade',
    projectNumber: '2021.1',
    version: 1,
    state: PlanState.APPROVED,
    projectDescription: `Replace the millstone and gears of the mill`,
    projectLocation: '2 By The Water, Hobbiton',
    projectMunicipality: 'Hobbiton',
    projectPostalCode: 'H0B 8I7',
    projectType: 'RENEWAL',
    councilResolutionMailed: true,
    dateOfResolution: new Date('2020/01/31'),
    costBreakdown: [
      {
        id: 1,
        activityType: 'Design/Engineering',
        amount: 10000,
      },
      {
        id: 2,
        activityType: 'Construction/Demolition',
        amount: 10000,
      },
      {
        id: 3,
        activityType: 'Contingency',
        amount: 10000,
      },
      {
        id: 4,
        activityType: 'Other',
        amount: 10000,
      },
    ],
    gasTaxExpenditureTimeline: [
      {year: 2019, plannedAmount: 10000, actualAmount: 0},
      {year: 2022, plannedAmount: 15000, actualAmount: 0},
      {year: 2021, plannedAmount: 20000, actualAmount: 0},
      {year: 2022, plannedAmount: 40000, actualAmount: 0},
      {year: 2023, plannedAmount: 15000, actualAmount: 0},
    ],
    proposedSourcesOfFunding: [
      {
        id: 1,
        fundingSource: 'Ale Tax Direct/Notional Allocation',
        program: null,
        confirmed: true,
        amount: 10000,
      },
      {
        id: 2,
        fundingSource: 'Applicant\'s Share',
        program: null,
        confirmed: true,
        amount: 10000,
      },
      {
        id: 3,
        fundingSource: 'Other Regional Source',
        program: 'Test Regional Program',
        confirmed: false,
        amount: 10000,
      },
      {
        id: 4,
        fundingSource: 'Other Source',
        program: 'Test Program',
        confirmed: true,
        amount: 10000,
      },
    ],
    projectTimelines: [
      {
        id: 1,
        activity: 'TIMELINE-Design/Engineering',
        startDate: new Date('2022/01/01'),
        completionDate: new Date('2022/01/15'),
      },
      {
        id: 2,
        activity: 'TIMELINE-Construction/Demolition',
        startDate: new Date('2022/01/16'),
        completionDate: new Date('2022/01/16'),
      },
      {
        id: 3,
        activity: 'TIMELINE-Contingency',
        startDate: new Date('2022/01/17'),
        completionDate: new Date('2022/02/01'),
      },
      {
        id: 4,
        activity: 'TIMELINE-Other',
        startDate: new Date('2022/02/01'),
        completionDate: new Date('2022/03/01'),
      },
      {
        id: 5,
        activity: 'TIMELINE-ACTIVITY-05',
        startDate: new Date('2022/01/01'),
        completionDate: new Date('2022/03/01'),
      },
    ],
    outcomesAndPlanning: [
      {
        code: 'OUTCOME-01',
        selected: true,
      },
      {
        code: 'OUTCOME-02',
        selected: false,
      },
      {
        code: 'OUTCOME-03',
        selected: true,
      },
      {
        code: 'OUTCOME-04',
        selected: false,
      },
      {
        code: 'OUTCOME-05',
        selected: false,
      },
      {
        code: 'OUTCOME-06',
        selected: false,
      },
      {
        code: 'OUTCOME-07',
        selected: false,
      },
      {
        code: 'OUTCOME-08',
        selected: false,
      },
      {
        code: 'OUTCOME-09',
        selected: false,
      },
      {
        code: 'OUTCOME-10',
        selected: false,
      },
      {
        code: 'OUTCOME-11',
        selected: false,
      },
    ],
    scheduleHIndicators: [
      {
        projectCategoryCode: 'disaster-mitigation-infrastructure',
        outcomes: [
          {
            code: '% of services projected to be protected due to the new mitigation infrastructure',
            selected: true,
          },
          {
            code: '% of properties projected to be less at-risk due to the new mitigation infrastructure',
            selected: true,
          },
          {
            code: '# or % of population projected to be less at-risk due to the new mitigation infrastructure',
            selected: false,
          },
          {
            code: '$ of Disaster Financial Assistance Arrangement funding and/or emergency response costs estimated to be reduced due to the new mitigation infrastructure, based on a previous or comparable event',
            selected: false,
          },
          {
            code: '% of at-risk infrastructure that is better protected as a result of the new mitigation infrastructure',
            selected: false,
          },
          {
            code: '% of mitigation plan that is implemented',
            selected: false,
          },
        ],
      }
    ],
    programRequirements: [
      {
        code: 'REQUIREMENT-01',
        selected: true,
      },
      {
        code: 'REQUIREMENT-02',
        selected: false,
      },
      {
        code: 'REQUIREMENT-03',
        selected: false,
      },
      {
        code: 'REQUIREMENT-04',
        selected: true,
      },
      {
        code: 'REQUIREMENT-05',
        selected: false,
      },
      {
        code: 'REQUIREMENT-06',
        selected: false,
      },
      {
        code: 'REQUIREMENT-07',
        selected: false,
      },
      {
        code: 'REQUIREMENT-08',
        selected: false,
      },
    ],
  },
  {
    municipalCode: '0001',
    projectTitle: 'Hobbiton Dike',
    projectNumber: '2020.1',
    version: 1,
    state: PlanState.APPROVED,
    projectDescription: `Build a dike protecting Hobbiton from spring floods`,
    projectLocation: '1 By The Water, Hobbiton',
    projectMunicipality: 'Hobbiton',
    projectPostalCode: 'H0B 8I7',
    projectType: 'NEW-INSTALLATION',
    councilResolutionMailed: true,
    dateOfResolution: new Date('2019/01/31'),
    costBreakdown: [
      {
        id: 1,
        activityType: 'Design/Engineering',
        amount: 10000,
      },
      {
        id: 2,
        activityType: 'Construction/Demolition',
        amount: 10000,
      },
      {
        id: 3,
        activityType: 'Contingency',
        amount: 10000,
      },
      {
        id: 4,
        activityType: 'Other',
        amount: 10000,
      },
    ],
    gasTaxExpenditureTimeline: [
      {year: 2019, plannedAmount: 10000, actualAmount: 0},
      {year: 2022, plannedAmount: 15000, actualAmount: 0},
      {year: 2021, plannedAmount: 20000, actualAmount: 0},
      {year: 2022, plannedAmount: 40000, actualAmount: 0},
      {year: 2023, plannedAmount: 15000, actualAmount: 0},
    ],
    proposedSourcesOfFunding: [
      {
        id: 1,
        fundingSource: 'Ale Tax Direct/Notional Allocation',
        program: null,
        confirmed: true,
        amount: 10000,
      },
      {
        id: 2,
        fundingSource: 'Applicant\'s Share',
        program: null,
        confirmed: true,
        amount: 10000,
      },
      {
        id: 3,
        fundingSource: 'Other Regional Source',
        program: 'Test Regional Program',
        confirmed: false,
        amount: 10000,
      },
      {
        id: 4,
        fundingSource: 'Other Source',
        program: 'Test Program',
        confirmed: true,
        amount: 10000,
      },
    ],
    projectTimelines: [
      {
        id: 1,
        activity: 'TIMELINE-Design/Engineering',
        startDate: new Date('2022/01/01'),
        completionDate: new Date('2022/01/15'),
      },
      {
        id: 2,
        activity: 'TIMELINE-Construction/Demolition',
        startDate: new Date('2022/01/16'),
        completionDate: new Date('2022/01/16'),
      },
      {
        id: 3,
        activity: 'TIMELINE-Contingency',
        startDate: new Date('2022/01/17'),
        completionDate: new Date('2022/02/01'),
      },
      {
        id: 4,
        activity: 'TIMELINE-Other',
        startDate: new Date('2022/02/01'),
        completionDate: new Date('2022/03/01'),
      },
      {
        id: 5,
        activity: 'TIMELINE-ACTIVITY-05',
        startDate: new Date('2022/01/01'),
        completionDate: new Date('2022/03/01'),
      },
    ],
    outcomesAndPlanning: [
      {
        code: 'OUTCOME-01',
        selected: true,
      },
      {
        code: 'OUTCOME-02',
        selected: false,
      },
      {
        code: 'OUTCOME-03',
        selected: true,
      },
      {
        code: 'OUTCOME-04',
        selected: false,
      },
      {
        code: 'OUTCOME-05',
        selected: false,
      },
      {
        code: 'OUTCOME-06',
        selected: false,
      },
      {
        code: 'OUTCOME-07',
        selected: false,
      },
      {
        code: 'OUTCOME-08',
        selected: false,
      },
      {
        code: 'OUTCOME-09',
        selected: false,
      },
      {
        code: 'OUTCOME-10',
        selected: false,
      },
      {
        code: 'OUTCOME-11',
        selected: false,
      },
    ],
    scheduleHIndicators: [
      {
        projectCategoryCode: 'disaster-mitigation-infrastructure',
        outcomes: [
          {
            code: '% of services projected to be protected due to the new mitigation infrastructure',
            selected: true,
          },
          {
            code: '% of properties projected to be less at-risk due to the new mitigation infrastructure',
            selected: true,
          },
          {
            code: '# or % of population projected to be less at-risk due to the new mitigation infrastructure',
            selected: false,
          },
          {
            code: '$ of Disaster Financial Assistance Arrangement funding and/or emergency response costs estimated to be reduced due to the new mitigation infrastructure, based on a previous or comparable event',
            selected: false,
          },
          {
            code: '% of at-risk infrastructure that is better protected as a result of the new mitigation infrastructure',
            selected: false,
          },
          {
            code: '% of mitigation plan that is implemented',
            selected: false,
          },
        ],
      }
    ],
    programRequirements: [
      {
        code: 'REQUIREMENT-01',
        selected: true,
      },
      {
        code: 'REQUIREMENT-02',
        selected: false,
      },
      {
        code: 'REQUIREMENT-03',
        selected: false,
      },
      {
        code: 'REQUIREMENT-04',
        selected: true,
      },
      {
        code: 'REQUIREMENT-05',
        selected: false,
      },
      {
        code: 'REQUIREMENT-06',
        selected: false,
      },
      {
        code: 'REQUIREMENT-07',
        selected: false,
      },
      {
        code: 'REQUIREMENT-08',
        selected: false,
      },
    ],
  },
  {
    municipalCode: '0001',
    projectTitle: 'Wastewater Treatment Tank Expansion',
    projectNumber: '2020.2',
    version: 1,
    state: PlanState.APPROVED,
    projectCategories: [
      'wastewater'
    ],
    projectDescription: 'Upgrade the existing wastewater treatment tank',
    projectLocation: '1 By The Water, Hobbiton',
    projectMunicipality: 'Hobbiton',
    projectPostalCode: 'H0B 8I7',
    projectType: 'EXPANSION',
    councilResolutionMailed: true,
    dateOfResolution: new Date('2019/08/01'),
    costBreakdown: [
      {
        id: 1,
        activityType: 'Design/Engineering',
        amount: 40000
      },
      {
        id: 2,
        activityType: 'Construction/Demolition',
        amount: 320000
      }
    ],
    gasTaxExpenditureTimeline: [
      {
        year: 2019,
        plannedAmount: 11000,
        actualAmount: 11000
      },
      {
        year: 2022,
        plannedAmount: 54000,
        actualAmount: 54000
      },
      {
        year: 2021,
        plannedAmount: 50000,
        actualAmount: 50000
      },
      {
        year: 2022,
        plannedAmount: 50000,
        actualAmount: 50000
      },
      {
        year: 2023,
        plannedAmount: 50000,
        actualAmount: 50000
      },
    ],
    proposedSourcesOfFunding: [
      {
        id: 1,
        fundingSource: 'Applicant\'s Share',
        program: 'Capital Fund',
        confirmed: true,
        amount: 565000
      }
    ],
    projectTimelines: [
      {
        id: 1,
        activity: 'TIMELINE-Design/Engineering',
        startDate: new Date('2019/01/01'),
        completionDate: new Date('2019/06/31'),
      },
      {
        id: 2,
        activity: 'TIMELINE-Construction/Demolition',
        startDate: new Date('2019/07/01'),
        completionDate: new Date('2022/02/28'),
      },
      {
        id: 3,
        activity: 'TIMELINE-Contingency',
        startDate: new Date('2022/03/01'),
        completionDate: new Date('2022/07/01'),
      },
      {
        id: 4,
        activity: 'TIMELINE-ACTIVITY-05',
        startDate: new Date('2022/07/01'),
        completionDate: new Date('2023/02/28'),
      },
    ],
    scheduleHIndicators: [
      {
        projectCategoryCode: 'wastewater',
        outcomes: [
          {
            code: '# and value of components (e.g. 1 software program @ $10,000)',
            description: null,
            selected: true
          },
          {
            code: '# manholes replaced',
            description: null,
            selected: false
          },
          {
            code: '# of EDU connections made available by new facility',
            description: null,
            selected: false
          },
          {
            code: '# of EDU’s that can be serviced or remain in service',
            description: null,
            selected: false
          },
          {
            code: '# of meters of pipes installed, repaired or replaced',
            description: null,
            selected: false
          },
          {
            code: '# of meters of supply pipes repaired or replaced servicing # of EDU’s (m3 per time frame and/or %)',
            description: null,
            selected: false
          },
          {
            code: 'additional volume of wastewater treated (m3 per time frame)',
            description: null,
            selected: true
          },
          {
            code: 'data collected (e.g. flow rates)',
            description: null,
            selected: true
          },
          {
            code: 'increase in capacity to treat water to higher standard (m3 per time frame and/or %)',
            description: null,
            selected: true
          },
          {
            code: 'WH saved using new more efficient pumps',
            description: null,
            selected: false
          },
          {
            code: 'reduction in # of days infrastructure is flooded',
            description: null,
            selected: true
          },
          {
            code: 'reduction in chemical use, or solid waste (weight and type per annum)',
            description: null,
            selected: false
          },
          {
            code: 'reduction in untreated wastewater (m3 per time frame)',
            description: null,
            selected: true
          }
        ]
      }
    ],
    outcomesAndPlanning: [
      {
        code: 'OUTCOME-01',
        description: 'Regional inventory forms completed',
        selected: true
      },
      {
        code: 'OUTCOME-02',
        description: 'Regional',
        selected: true
      },
      {
        code: 'OUTCOME-03',
        description: 'Using asset management tool developed by the Province',
        selected: true
      },
      {
        code: 'OUTCOME-04',
        description: 'Using other asset management software',
        selected: true
      },
      {
        code: 'OUTCOME-05',
        description: 'Involved in the AIMnet Cohort Program',
        selected: true
      },
      {
        code: 'OUTCOME-06',
        description: 'Implemented an asset management policy',
        selected: true
      },
      {
        code: 'OUTCOME-07',
        description: 'Completed the IPWEA asset management course',
        selected: true
      },
      {
        code: 'OUTCOME-08',
        description: 'Critical assets identified',
        selected: true
      },
      {
        code: 'OUTCOME-09',
        description: 'Council members supporting asset management initiatives',
        selected: true
      },
      {
        code: 'OUTCOME-10',
        description: 'Developed a 5, 10, 15, or 20 year expenditure projection',
        selected: true
      },
      {
        code: 'OUTCOME-11',
        description: 'Other',
        selected: false
      }
    ],
    programRequirements: [
      {
        code: 'REQUIREMENT-01',
        description: 'Application includes signed & sealed Council Resolution supporting the application',
        selected: true
      },
      {
        code: 'REQUIREMENT-02',
        description: 'Application includes approval from Council if any municipal funds are to be spent',
        selected: true
      },
      {
        code: 'REQUIREMENT-03',
        description: 'Applicant accepts responsibility for the project\'s ongoing operations and maintenance costs',
        selected: true
      },
      {
        code: 'REQUIREMENT-04',
        description: 'Applicant agrees to purchase and install signage when required through communications',
        selected: true
      },
      {
        code: 'REQUIREMENT-05',
        description: 'Applicant agrees to participate in Province-wide Asset Management Program',
        selected: true
      },
      {
        code: 'REQUIREMENT-06',
        description: 'Applicant confirms that an auditor has been hired or arrangements have been made to hire an auditor',
        selected: true
      },
      {
        code: 'REQUIREMENT-07',
        description: 'Applicant confirms that the proper budgetary process has been followed for this project',
        selected: true
      },
      {
        code: 'REQUIREMENT-08',
        description: 'Applicant confirms that the project has not been awarded or started',
        selected: true
      }
    ]
  },
];
