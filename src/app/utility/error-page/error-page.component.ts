import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent extends BaseComponent implements OnInit {
  constructor(private utilService: UtilService) {
    super();
  }

  ngOnInit(): void {}

  backToDashboard() {
    this.utilService.navigate([this.endpoints.dashboard]);
  }
}
