import { TeamDTO } from "../dto/team-dto";

export class Results {
  id!: number;
  date!: Date;
  home_team!: TeamDTO;
  home_team_score!: number;
  period!: number;
  postseason!: boolean;
  season!: number;
  status!: string;
  time!: string;
  visitor_team!: TeamDTO;
  visitor_team_score!: number;
}
