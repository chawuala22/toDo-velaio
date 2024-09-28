import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Task } from 'zone.js/lib/zone-impl';
import { DataTask } from '../../../interfaces/task';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss',
})
export class ViewTaskComponent implements OnInit {
  array_task : DataTask[] = [];
  constructor(private _serviceTask: TaskService) {}
  ngOnInit(): void {
    this.getTask();
  }

  getTask(){
    this._serviceTask.getTasks().subscribe({
      next: (tasks) => {
        this.array_task = tasks.data
        console.log(this.array_task);
      },
      error: (error) => {
        console.error(error);
      },
    })
  }
}
