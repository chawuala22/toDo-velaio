import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { DataTask } from '../../../interfaces/task';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.scss',
})
export class DetailTaskComponent implements OnInit {
  task_info!: DataTask;
  url: string = '';

  constructor(
    private _router: Router,
    private _serviceTask: TaskService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.url = params['id'];
    });
    console.log(this.url);
  }
  ngOnInit(): void {
    this.getTaskById();
  }

  goBack(): void {
    this._router.navigate(['/tasks']);
  }

  getTaskById() {
    this._serviceTask.getTaskById(this.url).subscribe({
      next: (task) => {
        this.task_info = task;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  updateTask(state: boolean) {
    const task = this.task_info;
    task.state = state;
    task.date_completed = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    this._serviceTask.updateTask(this.url, task).subscribe({
      next: () => {
        Swal.fire('Se ha completado la tarea con exito')
        this._router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  deleteTask(id: string) {
    this._serviceTask.deleteTask(id).subscribe({
      next: () => {
        Swal.fire('Se ha eliminado la tarea con exito')
        this._router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
}
