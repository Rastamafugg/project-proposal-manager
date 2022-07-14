import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalLandingPageComponent } from './regional-landing-page.component';

describe('ProvincialLandingPageComponent', () => {
  let component: RegionalLandingPageComponent;
  let fixture: ComponentFixture<RegionalLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
