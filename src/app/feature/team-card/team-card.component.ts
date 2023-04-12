import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamDTO } from '../dto/team-dto';
import { BaseComponent } from '../../utility/base.component';
import { UtilService } from '../../services/util.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
})
export class TeamCardComponent extends BaseComponent implements OnInit {
  @Input('team') team!: TeamDTO;
  @Input('pastDays') pastDays!: string[];
  @Output('emitter') emitter = new EventEmitter<number>();
  logoUrl!: string;

  constructor(private utilService: UtilService, private service: TeamService) {
    super();
  }

  ngOnInit(): void {
    this.logoUrl =
      this.endpoints.logos +
      this.team.abbreviation! +
      this.endpoints.extention_png;
  }

  removeFromList() {
    this.emitter.emit(this.team.id);
  }

  goToGameResults() {
    if (this.team && this.team.id) {
      sessionStorage.setItem('teamId', this.team.id.toString());
      let url: string = this.endpoints.results + this.team.abbreviation;
      this.utilService.navigate([url]);
    }
  }
}
