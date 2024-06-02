import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '../../../models/team';
import { DriverService } from '../../../services/driver.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  addDriverForm: FormGroup;
  errorMessage: string;
  teams: Team[];

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private router: Router,
    private teamService: TeamService
  ) {
    this.addDriverForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      teamId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTeams();
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

  onSubmit(): void {
    if (this.addDriverForm.valid) {
      const newDriver = {
        name: this.addDriverForm.value.name,
        number: this.addDriverForm.value.number,
        teamId: this.addDriverForm.value.teamId
      };

      this.driverService.addDriver(newDriver).subscribe(
        () => {
          console.log('Driver added successfully');
          this.addDriverForm.reset();
          this.router.navigate(['']);
        },
        error => {
          this.errorMessage = 'An error occurred while adding the driver.';
          console.error('Error adding driver:', error);
          alert('An error occurred while adding the driver.');
        }
      );
    }
  }

  onClear(): void {
    this.addDriverForm.reset();
    this.errorMessage = '';
  }

  onBack(): void {
    this.addDriverForm.reset();
    this.errorMessage = '';
    this.router.navigate(['']);
  }
}
