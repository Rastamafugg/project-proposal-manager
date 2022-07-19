import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MunicipalCipEditContainer } from './municipal-container.component';

describe('MunicipalContainerComponent', () => {
  let component: MunicipalCipEditContainer;
  let fixture: ComponentFixture<MunicipalCipEditContainer>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipalCipEditContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalCipEditContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
