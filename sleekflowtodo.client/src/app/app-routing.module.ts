import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './pages/todo/components/todo.component';
import { LoginComponent } from './pages/login/components/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'todo', component: TodoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
