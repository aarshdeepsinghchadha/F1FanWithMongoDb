import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrl: './delete-team.component.css'
})
export class DeleteTeamComponent {
  deleteTeamForm: FormGroup;
  errorMessage: string;
  teamId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {
    this.deleteTeamForm = this.fb.group({
      teamName: [{ value: '', disabled: true }, Validators.required]
    });
    this.teamId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getTeam();
  }


  getTeam(): void {
    this.teamService.getTeam(this.teamId).subscribe(
      driver => {
        this.deleteTeamForm.patchValue({
          teamName: driver.teamName
        });
      },
      error => {
        console.error('Error fetching driver:', error);
      }
    );
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete a world-class team?')) {
      this.teamService.deleteTeam(this.teamId).subscribe(
        response => {
          console.log('Team deleted successfully');
          this.router.navigate(['team']);
        },
        error => {
          this.errorMessage = 'An error occurred while deleting the team.';
          console.error('Error deleting team:', error);
          alert('An error occurred while deleting the team.');
        }
      );
    }
  }

  onBack(): void {
    this.deleteTeamForm.reset();
    this.errorMessage = '';
    this.router.navigate(['team']);
  }
}
