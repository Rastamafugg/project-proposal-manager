import {StaticDataState} from './static-data/static-data.state';
import {CapitalInvestmentPlanState} from './capital-investment-plan/capital-investment-plan.state';
import {ContactInfoState} from './contact-info/contact-info.state';

export interface ApplicationState {
  'static-data': StaticDataState;
  'capital-investment-plan': CapitalInvestmentPlanState;
  'contact-info': ContactInfoState;
}

