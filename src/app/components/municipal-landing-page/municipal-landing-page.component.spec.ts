import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalLandingPageComponent } from './municipal-landing-page.component';

describe('CaoLandingPageComponent', () => {
  let component: MunicipalLandingPageComponent;
  let fixture: ComponentFixture<MunicipalLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipalLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
