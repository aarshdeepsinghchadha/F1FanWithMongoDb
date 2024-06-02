import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../../models/team';
import { TeamService } from '../../../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css'
})
export class EditTeamComponent implements OnInit {
  editTeamForm: FormGroup;
  errorMessage: string;
  teams: Team[];
  teamId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {
    this.editTeamForm = this.fb.group({
      teamName: ['', Validators.required]
    });
    this.teamId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getTeam();
  }



  getTeam(): void {
    this.teamService.getTeam(this.teamId).subscribe(
      team => {
        this.editTeamForm.patchValue({
          teamName: team.teamName
        });
      },
      error => {
        console.error('Error fetching Team:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editTeamForm.valid) {
      const updatedTeam = {
        teamName: this.editTeamForm.value.teamName
      };

      this.teamService.updateTeam(this.teamId, updatedTeam).subscribe(
        response => {
          console.log('Response from backend:', response);
          this.editTeamForm.reset();
          this.router.navigate(['team']);
        },
        error => {
          this.errorMessage = 'An error occurred while updating the driver.';
          console.error('Error updating driver:', error);
          alert('An error occurred while updating the driver.');
        }
      );
    }
  }

  onClear(): void {
    this.editTeamForm.reset();
    this.errorMessage = '';
  }

  onBack(): void {
    this.editTeamForm.reset();
    this.errorMessage = '';
    this.router.navigate(['team']);
  }
}
