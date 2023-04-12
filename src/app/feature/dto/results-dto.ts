import { TeamDTO } from "./team-dto";

export class ResultsDTO {
  homeTeam!: TeamDTO;
  visitorTeam!: TeamDTO;
  homeScore!: number;
  visitorScore!: number;
  winner!: number;
  date!: Date;
}
