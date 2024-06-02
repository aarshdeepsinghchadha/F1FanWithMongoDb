import { Component, OnDestroy, OnInit } from '@angular/core';
import { Driver } from '../../../models/driver';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DriverService } from '../../../services/driver.service';

@Component({
  selector: 'app-get-driver',
  templateUrl: './get-driver.component.html',
  styleUrl: './get-driver.component.css'
})
export class GetDriverComponent implements OnInit, OnDestroy {
  drivers: Driver[] = [];
  searchTerm: string | null = null;
  subscription: Subscription;

  constructor(private driverService: DriverService,
              private router: Router) {}

  ngOnInit() {
    this.fetchDrivers();
  }

  onSearch(name?: string) {
    this.searchTerm = name;
    return this.fetchDrivers(this.searchTerm);
  }

  private fetchDrivers(name?: string) {
    this.subscription = this.driverService.getDrivers(name).subscribe((result: Driver[]) => (this.drivers = result));
  }

  onClear() {
    this.searchTerm = null; // Clear the search term
    this.fetchDrivers();    // Fetch drivers without any search term
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openAddDriverModal() {
    this.router.navigate(['/add-driver']);
  }

  onEdit(id: string){
    this.router.navigate(['/edit-driver', id]);
  }

  onDelete(id:string){
    this.router.navigate(['/delete-driver',id]);
  }

  openTeamList(){
    this.router.navigate(['team']);
  }
}
