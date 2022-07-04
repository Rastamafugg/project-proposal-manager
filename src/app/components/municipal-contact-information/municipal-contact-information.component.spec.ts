import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalContactInformationComponent } from './municipal-contact-information.component';

describe('MunicipalContactInformationComponent', () => {
  let component: MunicipalContactInformationComponent;
  let fixture: ComponentFixture<MunicipalContactInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipalContactInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
