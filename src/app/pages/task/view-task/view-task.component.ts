import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss',
})
export class ViewTaskComponent implements OnInit {
  constructor(private _serviceTask: TaskService) {}
  ngOnInit(): void {
    this.getTask();
  }

  getTask(){
    this._serviceTask.getTasks().subscribe({
      next: (tasks) => {
        console.log(tasks);
      },
      error: (error) => {
        console.error(error);
      },
    })
  }
}
