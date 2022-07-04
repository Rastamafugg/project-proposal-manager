import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {UserFormComponent} from './user-form-component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<UserFormComponent> {
  canDeactivate(component: UserFormComponent): boolean {

    if (component.hasUnsavedData()) {
      if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
