import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private url = `${environment.apiUrl}groups`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient, private dataService: DataService) { }

  createGroup(group: string): Observable<Group> {
    const newGroup = {
      name: group,
      createdAt: new Date(),
    }
    return this.http.post<Group>(this.url, newGroup);
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.url}/${group.id}`, group).pipe(map(group => {
      this.dataService.updateUserGroup(group);
      return group;
    }));
  }

  searchGroupByToken(groupToken: string): Observable<Group> {
    return this.http.get<Group>(`${this.url}?search=${groupToken}`, this.httpOptions).pipe(map(group => {
      this.dataService.updateUserGroup(group[0]);
      return group[0];
    }));
  }

  deleteGroup(id: Group["id"]): Observable<Group> {
    return this.http.delete<Group>(`${this.url}/${id}`);
  }

  addUserToGroup(user: User, group: Group): Observable<Group> {
    user.groupToken = group.token;
    user.groupId = group.id;
    return this.http.put<Group>(`${this.url}/${group.id}`, group, this.httpOptions);
  }
}
