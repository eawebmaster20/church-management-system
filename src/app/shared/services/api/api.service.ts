import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserAuth} from '../../Interfaces/auth'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  
  signIn(credentials:Partial<IUserAuth>){
    return this.http.post<any>(environment.apiUrl, credentials);
  }
}
