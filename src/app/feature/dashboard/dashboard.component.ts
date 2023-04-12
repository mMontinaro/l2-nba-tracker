import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { TeamDTO } from '../dto/team-dto';
import { BaseComponent } from '../../utility/base.component';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    protected service: TeamService,
    protected utilService: UtilService
  ) {
    super();
  }

  teams!: TeamDTO[];
  trackedTeams: TeamDTO[] = [];
  alreadyTracked = false;
  pastDaysArray!: string[];

  ngOnInit(): void {
    this.retrieveTrackedTeams();
    this.populateTeams();
    this.setLast12Days();
  }

  retrieveTrackedTeams(): void {
    let teamsFromSession = sessionStorage.getItem('trackedTeams');
    if (teamsFromSession) {
      this.trackedTeams = JSON.parse(teamsFromSession) as TeamDTO[];
    }
  }

  populateTeams(): void {
    let subscription = this.service.getListTeams().subscribe((resp) => {
      if (resp) {
        this.teams = [];
        this.teams = resp ? resp.data! : [];
      }
      subscription.unsubscribe();
    });
  }

  trackTeam(): void {
    var teamId = (<HTMLInputElement>document.getElementById('teamSelect'))
      .value;
    if (teamId) {
      let team = this.teams.filter((x) => x.id == Number.parseInt(teamId))[0];
      if (!this.trackedTeams.find((x) => x.id == team.id)) {
        this.alreadyTracked = false;
        this.trackedTeams.push(team);
        this.addToSession();
      } else {
        this.alreadyTracked = true;
      }
      console.log('<<< NOW TRACKING ' + team.abbreviation + ' >>>');
    }
  }

  removeCard(id: number): void {
    this.alreadyTracked = false;
    this.trackedTeams = this.trackedTeams.filter((x) => x.id != id);
    this.removeFromSession();
    console.log('<<< REMOVED TEAM WITH ID ' + id + '>>>');
  }

  setLast12Days() {
    this.pastDaysArray = this.utilService.getLast12Dates();
  }

  addToSession() {
    sessionStorage.clear();
    sessionStorage.setItem('trackedTeams', JSON.stringify(this.trackedTeams));
  }

  removeFromSession() {
    sessionStorage.clear();
    sessionStorage.setItem('trackedTeams', JSON.stringify(this.trackedTeams));
  }
}
