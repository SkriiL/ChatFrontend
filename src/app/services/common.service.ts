import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public typeaheadSettings = {
    typeDelay: 50,
    suggestionsLimit: 10,
    noMatchesText: 'No matches found',
    tagClass: 'btn badge badge-primary',
    tagRemoveIconClass: '',
    dropdownMenuClass: 'dropdown-menu w-100',
    dropdownMenuExpandedClass: 'dropdown-menu show w-100',
    dropdownMenuItemClass: 'dropdown-item',
    dropdownToggleClass: 'dropdown-toggle',
  };

  constructor() {
  }
}
