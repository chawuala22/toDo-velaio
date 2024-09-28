import { Routes } from '@angular/router';
import { taskRoutes } from './pages/task/task.routes';

export const routes: Routes = [
  {
    path: '',
    children: taskRoutes,
  },
 
];
