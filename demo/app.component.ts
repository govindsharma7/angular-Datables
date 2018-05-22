import { Component, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app',
  styleUrls: [
    '../src/themes/material.scss',
    '../src/themes/dark.scss',
    '../src/themes/bootstrap.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  template: `
    <div [class.dark]="state === 'chkbox-selection-template'">
      <content>
        <!-- Basic -->
        <chkbox-selection-template-demo *ngIf="!state"></chkbox-selection-template-demo>
      </content>
    </div>
  `
})
export class AppComponent {

  get state() {
    return window.state;
  }

  set state(state) {
    window.state = state;
  }

  version: string = APP_VERSION;

  constructor(location: Location) {
    this.state = location.path(true);
  }

}
