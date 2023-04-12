import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { SelectComponent } from './widgets/select/select.component';
import { TeamCardComponent } from './feature/team-card/team-card.component';
import { TeamScoresComponent } from './feature/team-scores/team-scores.component';
import { ErrorPageComponent } from './utility/error-page/error-page.component';
import { ResultsComponent } from './feature/team-card/results/results.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { ScoresComponent } from './feature/team-scores/scores/scores.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SelectComponent,
    TeamCardComponent,
    TeamScoresComponent,
    ErrorPageComponent,
    ResultsComponent,
    CardHeaderComponent,
    ScoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
