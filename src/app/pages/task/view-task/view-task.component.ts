import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { DataTask } from '../../../interfaces/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  array_task: DataTask[] = []; // Esta es la lista filtrada que se mostrará
  original_task: DataTask[] = []; // Mantiene los datos originales
  constructor(private _serviceTask: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this._serviceTask.getTasks().subscribe({
      next: (tasks) => {
        this.original_task = tasks.data; // Asigna los datos originales
        this.array_task = [...this.original_task]; // Copia para mostrar y filtrar
        console.log(this.array_task);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  goToDetail(taskId: string) {
    this.router.navigate([`/view-detail/${taskId}`]);
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log(selectElement.value);
    this.filterTasks(selectElement.value);
  }

  filterTasks(selectedValue: string) {
    if (selectedValue === '1') {
      this.array_task = this.original_task.filter((task) => task.state === false);
    } else if (selectedValue === '2') {
      this.array_task = this.original_task.filter((task) => task.state === true);
    } else {
      this.array_task = [...this.original_task];
    }
  }
}
