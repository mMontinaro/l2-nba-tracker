import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../utility/constants';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css'],
})
export class CardHeaderComponent implements OnInit {
  @Input('conference') conference?: string;
  @Input('abbreviation') abbreviation!: string;
  @Input('fullName') fullName!: string;

  constructor() {}

  ngOnInit(): void {
    if (this.conference && this.conference?.trim() != '') {
      this.conference = this.conference.startsWith(constants.labels.west)
        ? 'Western conference'
        : 'Eastern conference';
    }
  }
}
