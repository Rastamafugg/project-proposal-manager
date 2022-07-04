import {HostListener} from '@angular/core';

export abstract class UserFormComponent {

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasUnsavedData()) {
      $event.returnValue = true;
    }
  }

  abstract hasUnsavedData(): boolean;
}
