import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTask, RequestTask, Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  urlBase: string = 'https://tasks-pearl.vercel.app/task';

  constructor(private _httpClient: HttpClient) {}

  getTasks() {
    return this._httpClient.get<RequestTask>(this.urlBase);
  }

  getTaskById(taskId: string){
    return this._httpClient.get<DataTask>(`${this.urlBase}/${taskId}`);
  }

  createTask(task: Task) {
    return this._httpClient.post<Task>(this.urlBase, task);
  }

  updateTask(id: string, task: Task) {
    return this._httpClient.patch<Task>(`${this.urlBase}/${id}`, task);
  }
  deleteTask(taskId: string) {
    return this._httpClient.delete(`${this.urlBase}/${taskId}`);
  }
}
