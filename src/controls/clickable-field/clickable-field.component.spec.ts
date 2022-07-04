import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableFieldComponent } from './clickable-field.component';

describe('ClickableFieldComponent', () => {
  let component: ClickableFieldComponent;
  let fixture: ComponentFixture<ClickableFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
