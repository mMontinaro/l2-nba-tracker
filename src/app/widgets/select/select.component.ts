import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: '[wgt-select]',
  template: `
    <option value [selected]="true">{{selectOption}}</option>
    <ng-content></ng-content>
  `,
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  selectOption!: string;

  constructor() { }

  ngOnInit(): void {
    this.selectOption = "- Select an option -";
  }

}
