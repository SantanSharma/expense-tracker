import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from '../components/expense-list/expense-list.component';
import { ExpenseFormComponent } from '../components/expense-form/expense-form.component';

const routes: Routes = [
  { path: '', component: ExpenseListComponent },
  { path: 'app-expense', component: ExpenseFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }