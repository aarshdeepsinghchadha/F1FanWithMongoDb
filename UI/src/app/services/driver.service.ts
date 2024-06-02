import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver';
import { AddDriver } from '../models/addDriver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDrivers(searchTerm?: string): Observable<Driver[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<Driver[]>(`${this.apiUrl}/api/drivers`, { params });
  }

  getDriver(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/api/drivers/${id}`);
  }

  
  addDriver(driver: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/drivers`, driver, { responseType: 'text' as 'json' });
  }

  updateDriver(id: string, editDriver: AddDriver): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/api/drivers/${id}`, editDriver,  { responseType: 'text' as 'json' });
  }

  deleteDriver(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/api/drivers/${id}`,  { responseType: 'text' as 'json' });
  }

}
