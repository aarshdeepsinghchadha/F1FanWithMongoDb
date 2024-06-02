import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddTeam } from '../models/addTeam';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getTeams(searchTerm?: string): Observable<Team[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<Team[]>(`${this.apiUrl}/api/TeamDriver`, { params });
  }

  getTeam(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/api/TeamDriver/${id}`);
  }

  addTeam(addTeam: AddTeam): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/TeamDriver`, addTeam, { responseType: 'text' as 'json' });
  }

  updateTeam(id: string, team: AddTeam): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/api/TeamDriver/${id}`, team, { responseType: 'text' as 'json' });
  }

  deleteTeam(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/api/TeamDriver/${id}`, { responseType: 'text' as 'json' });
  }
}
