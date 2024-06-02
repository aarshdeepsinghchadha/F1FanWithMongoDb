import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDriverComponent } from './components/driver/add-driver/add-driver.component';
import { EditDriverComponent } from './components/driver/edit-driver/edit-driver.component';
import { DeleteDriverComponent } from './components/driver/delete-driver/delete-driver.component';
import { GetDriverComponent } from './components/driver/get-driver/get-driver.component';
import { GetTeamComponent } from './components/team/get-team/get-team.component';
import { AddTeamComponent } from './components/team/add-team/add-team.component';
import { EditTeamComponent } from './components/team/edit-team/edit-team.component';
import { DeleteTeamComponent } from './components/team/delete-team/delete-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverService } from './services/driver.service';
import { TeamService } from './services/team.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddDriverComponent,
    EditDriverComponent,
    DeleteDriverComponent,
    GetDriverComponent,
    GetTeamComponent,
    AddTeamComponent,
    EditTeamComponent,
    DeleteTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DriverService,TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
