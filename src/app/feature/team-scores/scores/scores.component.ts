import { Component, Input, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { UtilService } from '../../../services/util.service';
import { BaseComponent } from '../../../utility/base.component';
import { ResultsDTO } from '../../dto/results-dto';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
})
export class ScoresComponent extends BaseComponent implements OnInit {
  results!: ResultsDTO[];
  pastDays!: string[];
  @Input('id') id?: number;
  isShown: boolean = false;

  constructor(private service: TeamService, private utilService: UtilService) {
    super();
  }

  ngOnInit(): void {
    this.pastDays = this.utilService.getLast12Dates();
    this.getGameResults();
  }

  getGameResults() {
    let subscription = this.service
      .getResultsByDatesAndId(this.pastDays, this.id!)
      .subscribe((resp) => {
        if (resp && resp.data && resp.data.length != 0) {
          this.results = this.utilService.mapResults(resp.data);
          this.isShown = true;
        } else {
          this.isShown = false;
        }
        subscription.unsubscribe();
      });
  }
}
