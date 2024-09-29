import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Task } from 'zone.js/lib/zone-impl';
import { DataTask } from '../../../interfaces/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss',
})
export class ViewTaskComponent implements OnInit {
  array_task: DataTask[] = [];
  constructor(private _serviceTask: TaskService, private router: Router) {}
  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this._serviceTask.getTasks().subscribe({
      next: (tasks) => {
        this.array_task = tasks.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  goToDetail(taskId: string) {
    this.router.navigate([`/view-detail/${taskId}`]);
  }
}
