import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080'

  constructor(private http:HttpClient) {}
  
  authSubject = new BehaviorSubject<any>({
    users:[],
  })

  getAllUsers():Observable<any>{
    const headers= new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
     })
    return this.http.get(`${this.baseUrl}/users`, {headers}).pipe(
        tap((users)=>{
          const currentState=this.authSubject.value;
          this.authSubject.next({...currentState, users});
        })
    );
  }
}
