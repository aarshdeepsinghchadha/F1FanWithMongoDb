import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Team } from '../../../models/team';
import { DriverService } from '../../../services/driver.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {
  deleteDriverForm: FormGroup;
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
    this.deleteDriverForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      number: [{ value: '', disabled: true }, Validators.required],
      teamId: [{ value: '', disabled: true }, Validators.required]
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
        this.deleteDriverForm.patchValue({
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

  onDelete(): void {
    if (confirm('Are you sure you want to delete a world-class driver?')) {
      this.driverService.deleteDriver(this.driverId).subscribe(
        response => {
          console.log('Driver deleted successfully');
          this.router.navigate(['']);
        },
        error => {
          this.errorMessage = 'An error occurred while deleting the driver.';
          console.error('Error deleting driver:', error);
          alert('An error occurred while deleting the driver.');
        }
      );
    }
  }

  onBack(): void {
    this.deleteDriverForm.reset();
    this.errorMessage = '';
    this.router.navigate(['']);
  }
}
