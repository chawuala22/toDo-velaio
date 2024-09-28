import { Routes } from '@angular/router';

export const taskRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./view-task/view-task.component').then(m => m.ViewTaskComponent),
    children: [
      {
        path: 'create-task',
        loadComponent: () => import('./create-task/create-task.component').then(m => m.CreateTaskComponent)
      },
      {
        path: 'view-detail/:id',
        loadComponent: () => import('./detail-task/detail-task.component').then(m => m.DetailTaskComponent)
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

