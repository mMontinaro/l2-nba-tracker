import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamDTO } from '../feature/dto/team-dto';
import { endpoints } from '../utility/constants';
import { PaginatedResponse } from '../utility/paginated-response';
import { UtilService } from './util.service';
import { ResultsDTO } from '../feature/dto/results-dto';
import { Results } from '../feature/model/result';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(protected http: HttpClient) {}

  public getListTeams(): Observable<PaginatedResponse<TeamDTO>> {
    return this.http.get<PaginatedResponse<TeamDTO>>(endpoints.base_url_teams, {
      headers: this.headers,
      params: this.queryParams,
    });
  }

  public getTeamById(id: number): Observable<TeamDTO> {
    return this.http.get<TeamDTO>(endpoints.base_url_teams + id.toString(), {
      headers: this.headers,
      params: this.queryParams,
    });
  }

  public getResultsByDatesAndId(
    dates: string[],
    id: number
  ): Observable<PaginatedResponse<Results>> {
    return this.http.get<PaginatedResponse<Results>>(endpoints.base_url_games, {
      headers: this.headers,
      params: this.getResultsQueryParams(dates, id),
    });
  }

  public get headers() {
    const headers: HttpHeaders = new HttpHeaders()
      .set(
        'X-RapidAPI-Key',
        '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX'
      )
      .set('X-RapidAPI-Host', 'free-nba.p.rapidapi.com');
    return headers;
  }

  public get queryParams() {
    const queryParams: HttpParams = new HttpParams().set('per_page', 100);
    return queryParams;
  }

  public getResultsQueryParams(dates: string[], id: number) {
    var queryParams: HttpParams = new HttpParams()
      .set('per_page', 12)
      .set('team_ids[]', id);
    for (let date of dates) {
      queryParams = queryParams.append('dates[]', date);
    }
    return queryParams;
  }
}
