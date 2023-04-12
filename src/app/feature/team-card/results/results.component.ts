import { Component, Input, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { UtilService } from '../../../services/util.service';
import { BaseComponent } from '../../../utility/base.component';
import { ResultsDTO } from '../../dto/results-dto';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent extends BaseComponent implements OnInit {
  @Input('id') id?: number;
  @Input('cod') cod?: string;
  @Input('pastDays') pastDays!: string[];
  logoUrl!: string;
  results!: ResultsDTO[];
  avgScored!: number;
  avgConceded!: number;
  winLoss!: string[];
  isShown: boolean = false;

  constructor(private service: TeamService, private utilService: UtilService) {
    super();
  }

  ngOnInit(): void {
    this.winLoss = new Array();
    this.getGameResults();
    this.retrieveTeamLogo();
  }

  getGameResults() {
    let subscription = this.service
      .getResultsByDatesAndId(this.pastDays, this.id!)
      .subscribe((resp) => {
        if (resp && resp.data && resp.data.length != 0) {
          this.results = this.utilService.mapResults(resp.data);
          this.lastGames();
          this.calcAverages();
          this.isShown = true;
        } else {
          this.isShown = false;
        }
        subscription.unsubscribe();
      });
  }

  private lastGames() {
    for (let game of this.results) {
      this.winLoss.push(
        this.id == game.winner
          ? this.constants.results.win
          : this.constants.results.lose
      );
    }
  }

  private calcAverages() {
    this.calcAvgScored();
    this.calcAvgConceded();
  }

  private calcAvgScored() {
    let numTotalEl = this.results.length;
    let sum = 0;

    for (let game of this.results) {
      sum += this.id == game.homeTeam.id ? game.homeScore : game.visitorScore;
    }

    this.avgScored = Math.floor(sum / numTotalEl);
  }

  private calcAvgConceded() {
    let numTotalEl = this.results.length;
    let sum = 0;

    for (let game of this.results) {
      sum += this.id == game.homeTeam.id ? game.visitorScore : game.homeScore;
    }

    this.avgConceded = Math.floor(sum / numTotalEl);
  }

  private retrieveTeamLogo() {
    this.logoUrl =
      this.endpoints.logos + this.cod! + this.endpoints.extention_png;
  }
}
