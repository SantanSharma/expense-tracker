import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
  expenses: Expense[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('expenses');
      this.expenses = saved ? JSON.parse(saved) : [];
    }
  }

  deleteExpense(id: number) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  goToAddExpense() {
    this.router.navigate(['/add-expense']);
  }
}