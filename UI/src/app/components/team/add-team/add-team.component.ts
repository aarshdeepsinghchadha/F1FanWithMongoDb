import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../../models/team';
import { TeamService } from '../../../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {
  addTeamForm: FormGroup;
  errorMessage: string;
  teams: Team[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private teamService: TeamService
  ) {
    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addTeamForm.valid) {
      const newTeam = {
        teamName: this.addTeamForm.value.teamName,
      };

      this.teamService.addTeam(newTeam).subscribe(
        () => {
          console.log('Driver added successfully');
          this.addTeamForm.reset();
          this.router.navigate(['team']);
        },
        error => {
          this.errorMessage = 'An error occurred while adding the team.';
          console.error('Error adding team:', error);
          alert('An error occurred while adding the team.');
        }
      );
    }
  }

  onClear(): void {
    this.addTeamForm.reset();
    this.errorMessage = '';
  }

  onBack(): void {
    this.addTeamForm.reset();
    this.errorMessage = '';
    this.router.navigate(['team']);
  }
}
