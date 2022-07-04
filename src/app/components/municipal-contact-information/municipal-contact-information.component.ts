import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {loadContactInfo, updateContactInfo} from '../../../store/contact-info/contact-info.actions';
import {selectMunicipalContactInfo} from '../../../store/contact-info/contact-info.selectors';
import {ApplicationState} from '../../../store';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {UiUtilsService} from '../../../services/ui-utils.service';
import {UserFormComponent} from '../../directives/can-deactivate-guard/user-form-component';

@Component({
  selector: 'app-municipal-contact-information',
  templateUrl: './municipal-contact-information.component.html',
  styleUrls: ['./municipal-contact-information.component.scss']
})
export class MunicipalContactInformationComponent extends UserFormComponent implements OnInit {
  public municipalCode;
  public contactForm;

  private contactInfo$;

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
    return this.contactForm && this.contactForm.dirty;
  }

  ngOnInit() {
    this.municipalCode = this.route.snapshot.paramMap.get('municipalCode');
    this.store.dispatch(loadContactInfo({municipalCode: this.municipalCode}));
    this.contactForm = this.uiUtils.createContactForm();
    this.contactInfo$ = this.store.select(state => selectMunicipalContactInfo(state, {municipalCode: this.municipalCode}));
    this.contactInfo$.subscribe(contactInfo => this.contactForm.setValue(contactInfo));
  }

  submitForm() {
    this.store.dispatch(updateContactInfo({contactInfo: this.contactForm.value}));
    this.snackbar.open('Save Success', null, {
      duration: 2000
    });
    this.contactForm.reset();
    this.goToPreviousPage();
  }

  goToPreviousPage() {
    this.location.back();
  }

  printPage() {
    window.print();
  }
}
