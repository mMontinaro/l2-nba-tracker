import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { TeamScoresComponent } from './feature/team-scores/team-scores.component';
import { ErrorPageComponent } from './utility/error-page/error-page.component';

const routes: Routes = [
  { path : '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path : 'dashboard', component: DashboardComponent },
  { path : 'results/:teamCod', component: TeamScoresComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
