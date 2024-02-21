import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080'

  constructor(private http:HttpClient) {}

  taskSubject = new BehaviorSubject<any>({
    tasks:[],
    loading: false,
    newTask: null
  })

  private getHeaders():HttpHeaders{
    const token=localStorage.getItem("jwt")
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    })
  }

  getTasks():Observable<any>{
    const headers=this.getHeaders();
    return this.http.get(`${this.baseUrl}/tasks`, {headers}).pipe(
        tap((tasks)=>{
          const currentState=this.taskSubject.value;
          this.taskSubject.next({...currentState, tasks});
        })
    );
  }

  createTasks(task:any, userId:any):Observable<any>{
    const headers=this.getHeaders();
    return this.http.post(`${this.baseUrl}/tasks/${userId}`, task, {headers}).pipe(
        tap((newTask)=>{
          const currentState=this.taskSubject.value;
          this.taskSubject.next({...currentState, 
            tasks: 
          [newTask,...currentState.tasks]});
        })
    );
  }

  updateTasks(task: any, userId: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/tasks/${task.id}/${userId}`, task, { headers }).pipe(
      tap((updatedTask: any) => {
        const updatedTasks = this.taskSubject.value.tasks.map((item: any) => 
          item.id === updatedTask.id ? updatedTask : item
        );
        this.taskSubject.next({ ...this.taskSubject.value, tasks: updatedTasks });
      })
    );
  }

  deleteTasks(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}/tasks/${id}`, { headers })
      .pipe(
        tap((deletedTasks: any) => {
          const currentState = this.taskSubject.value;
          const updatedTasks = currentState.tasks.filter((item: any) => item.id !== id);
          this.taskSubject.next({...currentState, tasks: updatedTasks });
        })
      );
  }

  findTaskById(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/tasks/${id}`, { headers }).pipe(
      tap((foundTask: any) => {
        const currentState = this.taskSubject.value;
        this.taskSubject.next({ ...currentState, tasks: [foundTask] });
      })
    );
  }
  
}
