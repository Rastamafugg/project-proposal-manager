import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegionalLandingPageComponent } from './regional-landing-page.component';

describe('RegionalLandingPageComponent', () => {
  let component: RegionalLandingPageComponent;
  let fixture: ComponentFixture<RegionalLandingPageComponent>;

  beforeEach(waitForAsync(() => {
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
