import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store';
import {Municipality} from '../../../store/static-data/static-data.state';
import {loadMunicipalities} from '../../../store/static-data/static-data.actions';
import {selectMunicipalities} from '../../../store/static-data/static-data.selectors';

@Component({
  selector: 'app-admin-landing-page',
  templateUrl: './admin-landing-page.component.html',
  styleUrls: ['./admin-landing-page.component.scss']
})
export class AdminLandingPageComponent implements OnInit {
  municipalities: Municipality[] = [];
  private municipalities$;

  constructor(
    private store: Store<ApplicationState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(loadMunicipalities());
    this.municipalities$ = this.store.select(state => selectMunicipalities(state));
    this.municipalities$.subscribe(municipalities => this.municipalities = municipalities);
  }
}
