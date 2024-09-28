import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
urlBase: string = 'https://tasks-pearl.vercel.app/task'
  constructor(private _httpClient : HttpClient) { }


  getTasks() {
    return this._httpClient.get<Task[]>(this.urlBase);
  }

  createTask(task : Task){
    return this._httpClient.post<Task>('http://localhost:3000/tasks', task);
  }

  // updateTask(task : Task){
  //   return this._httpClient.put(`http://localhost:3000/tasks/${task._id}`, task);
  // }

}
