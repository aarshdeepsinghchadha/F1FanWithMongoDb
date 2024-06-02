import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Team } from '../../../models/team';
import { DriverService } from '../../../services/driver.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrl: './edit-driver.component.css'
})
export class EditDriverComponent implements OnInit {
  editDriverForm: FormGroup;
  errorMessage: string;
  teams: Team[];
  driverId: string;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {
    this.editDriverForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      teamId: ['', Validators.required]
    });
    this.driverId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getTeams();
    this.getDriver();
  }

  getTeams(): void {
    this.teamService.getTeams().subscribe(
      teams => {
        this.teams = teams;
      },
      error => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  getDriver(): void {
    this.driverService.getDriver(this.driverId).subscribe(
      driver => {
        this.editDriverForm.patchValue({
          name: driver.name,
          number: driver.number,
          teamId: driver.teamId
        });
      },
      error => {
        console.error('Error fetching driver:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editDriverForm.valid) {
      const updatedDriver = {
        name: this.editDriverForm.value.name,
        number: this.editDriverForm.value.number,
        teamId: this.editDriverForm.value.teamId
      };

      this.driverService.updateDriver(this.driverId, updatedDriver).subscribe(
        response => {
          console.log('Response from backend:', response);
          this.editDriverForm.reset();
          this.router.navigate(['']);
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
    this.editDriverForm.reset();
    this.errorMessage = '';
  }

  onBack(): void {
    this.editDriverForm.reset();
    this.errorMessage = '';
    this.router.navigate(['']);
  }
}
