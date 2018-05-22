import { AfterViewInit, Component } from '@angular/core';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'chkbox-selection-template-demo',
  template: `
    <div>
      <h3>
        Angular Assignment        
      </h3>
      <div style='float:left;width:75%'>
        <ngx-datatable
          style="width: 90%; color: "
          class="material"
          [rows]="rows"
          [columnMode]="'force'"
          [headerHeight]="50"
          [footerHeight]="50"
          [rowHeight]="'auto'"
          [limit]="5"
          [selected]="selected"
          [selectionType]="'checkbox'"
          (activate)="onActivate($event)"
          (select)='onSelect($event)'>
          <ngx-datatable-column [width]="30" [sortable]="false" [canAutoResize]="false" [draggable]="false" [resizeable]="false">
              <ng-template ngx-datatable-header-template let-value="value" let-allRowsSelected="allRowsSelected" let-selectFn="selectFn">
                <input type="checkbox" [checked]="allRowsSelected" (change)="selectFn(!allRowsSelected)"/>
              </ng-template>
              <ng-template ngx-datatable-cell-template let-value="value" let-isSelected="isSelected" let-onCheckboxChangeFn="onCheckboxChangeFn">
                <input type="checkbox" [checked]="isSelected" (change)="onCheckboxChangeFn($event)"/>
              </ng-template>
          </ngx-datatable-column>
          <ngx-datatable-column name="Firstname"></ngx-datatable-column>
          <ngx-datatable-column name="Lastname"></ngx-datatable-column>
          <ngx-datatable-column name="Product"></ngx-datatable-column>
          <ngx-datatable-column name="Quantity"></ngx-datatable-column>
          <ngx-datatable-column name="Unitprice"></ngx-datatable-column>
          <ngx-datatable-column name="Total">$</ngx-datatable-column>          
        </ngx-datatable>
      </div>

      <div class='selected-column'>
        <h4>Selections <small>({{selected?.length}})</small></h4>
        <div class="col-md-6 col-md-offset-3" style="float:right;">
          <button (click)="ngxSmartModalService.getModal('myModal').open()">Invoice</button>
        </div>
        <ul>
          <li *ngFor='let sel of selected'>
            {{sel.product}}-{{sel.quantity}} - {{sel.unitprice}} - {{sel.unitprice*sel.quantity*0.06}} - {{sel.unitprice*sel.quantity+sel.unitprice*sel.quantity*0.06}}
          </li>
          <li *ngIf="!selected?.length">No Selections</li>
        </ul>
      </div>

      <!-- <ngx-smart-modal #modalData identifier="modalData" customClass="nsm-dialog-animation-ltr">
        <h1>Invoice</h1>
        <div *ngIf="modalData.hasData()">
          <pre>{{ modalData.getData() | json }}</pre>
        </div>
        <button class="button -dark" (click)="modalData.close()">Close</button>
      </ngx-smart-modal> -->
      
  `
})
export class CustomCheckboxSelectionComponent {

  rows = [];
  selected = [];
  dataCollection = [];
  private bodyText: string;

  constructor(public ngxSmartModalService: NgxSmartModalService) {
    this.fetch((data) => {
      this.rows = data;
      console.log(this.rows);
    });
  }

  ngAfterViewInit() {
    const obj: Object = {
      prop1: 'test',
      prop2: true,
      prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
      prop4: 327652175423
    };

    this.ngxSmartModalService.setModalData(obj, 'modalData');

    this.ngxSmartModalService.getModal('modalData').onOpen.subscribe((modal: NgxSmartModalComponent) => {
      console.log(modal.getData());
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
