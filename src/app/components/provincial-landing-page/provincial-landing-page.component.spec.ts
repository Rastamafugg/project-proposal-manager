import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincialLandingPageComponent } from './provincial-landing-page.component';

describe('ProvincialLandingPageComponent', () => {
  let component: ProvincialLandingPageComponent;
  let fixture: ComponentFixture<ProvincialLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvincialLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincialLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
