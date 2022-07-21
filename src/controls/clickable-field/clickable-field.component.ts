import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-clickable-field',
  templateUrl: './clickable-field.component.html',
  styleUrls: ['./clickable-field.component.scss']
})
export class ClickableFieldComponent {
  @Input() componentPath: string[];
  @Input() selectedComponentPath: string[];
  @Input() readOnlyValue: string;
  @Input() controlName: string;
  @Output() componentSelected: EventEmitter<string[]> = new EventEmitter();
  constructor() { }

  isSelectedPath() {
    if (!this.componentPath || this.componentPath.length !== this.selectedComponentPath.length) {
      return false;
    }
    let areEqual = true;
    for (const [index, value] of this.selectedComponentPath.entries()) {
      if (this.componentPath[index] !== value) {
        areEqual = false;
        break;
      }
    }
    return areEqual;
  }

  setSelectedPath() {
    this.componentSelected.emit(this.componentPath);
  }
}
