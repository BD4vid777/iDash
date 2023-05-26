import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from "./pages/todos/todos.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NotesComponent } from "./pages/notes/notes.component";
import { BudgetComponent } from "./pages/budget/budget.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'budget', component: BudgetComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
