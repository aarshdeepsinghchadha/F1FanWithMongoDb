import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetDriverComponent } from './components/driver/get-driver/get-driver.component';
import { AddDriverComponent } from './components/driver/add-driver/add-driver.component';
import { EditDriverComponent } from './components/driver/edit-driver/edit-driver.component';
import { DeleteDriverComponent } from './components/driver/delete-driver/delete-driver.component';
import { GetTeamComponent } from './components/team/get-team/get-team.component';
import { AddTeamComponent } from './components/team/add-team/add-team.component';
import { EditTeamComponent } from './components/team/edit-team/edit-team.component';
import { DeleteTeamComponent } from './components/team/delete-team/delete-team.component';

const routes: Routes = [
  {path:'', component: GetDriverComponent},
  {path:'add-driver', component: AddDriverComponent},
  {path:'edit-driver/:id', component: EditDriverComponent},
  {path:'delete-driver/:id', component: DeleteDriverComponent},
  {path:'team', component: GetTeamComponent},
  {path:'add-team', component: AddTeamComponent},
  {path:'edit-team/:id', component: EditTeamComponent},
  {path:'delete-team/:id', component: DeleteTeamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
