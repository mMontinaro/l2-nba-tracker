import { PageDTO } from "./page-dto";

export class PaginatedResponse<T>{
  data?: T[];
  meta?: PageDTO;
}
