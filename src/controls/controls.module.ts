import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickableFieldComponent } from './clickable-field/clickable-field.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [ClickableFieldComponent],
  exports: [
    ClickableFieldComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class ControlsModule { }
