import { Component, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../../../models/team';
import { Subscription } from 'rxjs';
import { TeamService } from '../../../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-team',
  templateUrl: './get-team.component.html',
  styleUrl: './get-team.component.css'
})
export class GetTeamComponent implements OnInit, OnDestroy{
  teams: Team[] = [];
  searchTerm: string | null = null;
  subscription: Subscription;

  constructor(private teamService: TeamService ,
              private router: Router) {}

  ngOnInit() {
    this.fetchTeams();
  }

  onSearch(name?: string) {
    this.searchTerm = name;
    return this.fetchTeams(this.searchTerm);
  }

  private fetchTeams(name?: string) {
    this.subscription = this.teamService.getTeams(name).subscribe((result: Team[]) => (this.teams = result));
  }

  onClear() {
    this.searchTerm = null; // Clear the search term
    this.fetchTeams();    // Fetch drivers without any search term
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openAddTeamModal() {
    this.router.navigate(['/add-team']);
  }

  onEdit(id: string){
    this.router.navigate(['/edit-team', id]);
  }

  onDelete(id:string){
    this.router.navigate(['/delete-team',id]);
  }

  openDriverList(){
    this.router.navigate(['']);
  }
}
