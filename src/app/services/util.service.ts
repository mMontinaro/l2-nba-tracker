import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { TeamDTO } from '../feature/dto/team-dto';
import { DatePipe } from '@angular/common';
import { Results } from '../feature/model/result';
import { ResultsDTO } from '../feature/dto/results-dto';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  LAST_DAYS = 12;
  format = "yyyy-MM-dd";

  constructor( protected router: Router, protected datepipe: DatePipe) { }

  public navigate(url: string[], extras?: NavigationExtras) {
    if(extras){
      this.router.navigate(url, extras);
    }
    this.router.navigate(url);
  }

  public getTeamId(): number {
    let id = sessionStorage.getItem("teamId");
    return id ? Number.parseInt(id) : -1;
  }

  public getTeamCod(): string{
    let cod = this.router.parseUrl(this.router.url).root.children['primary'].segments[1];
    return cod.path;
  }

  public mapResults(results: Results[]): ResultsDTO[]{
    var r: ResultsDTO[] = [];

    results = results.sort((d1, d2) => {
      return d1.date < d2.date ? -1 : 1;
    });

    for(let result of results){
      let toAdd = new ResultsDTO();
      toAdd.homeTeam = result.home_team;
      toAdd.homeScore = result.home_team_score;
      toAdd.visitorTeam = result.visitor_team;
      toAdd.visitorScore = result.visitor_team_score;
      toAdd.date = result.date;

      if(toAdd.homeScore > toAdd.visitorScore) {
        toAdd.winner = toAdd.homeTeam.id!;
      } else if(toAdd.homeScore < toAdd.visitorScore){
        toAdd.winner = toAdd.visitorTeam.id!;
      } else {
        toAdd.winner = -1;
      }

      r.push(toAdd);
    }

    return r;
  }


  //can be upgraded to take into account the yearly changes
  public getLast12Dates(): string[]{
    var date = new Date();
    var dateArray = new Array();
    for(let i = 1; i <= this.LAST_DAYS; i++){
      dateArray.push(this.getFormattedDate(date));
      var newDay = date.getDate()-1;
      if(newDay < 1){
        var oldMonth = date.getMonth();
        date.setMonth(oldMonth - 1 );
        date.setDate(new Date(date.getFullYear(), oldMonth, 0).getDate());
      } else {
        date.setDate(newDay);
      }
    }
    return dateArray;
  }

  private getFormattedDate(date: Date){
    return this.datepipe.transform(date, this.format);
  }

}
