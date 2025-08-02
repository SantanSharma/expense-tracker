import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit {
  @Output() expenseAdded = new EventEmitter<Expense>();

  expense: Partial<Expense> = {
    date: '',
    category: '',
    amount: 0,
    description: ''
  };

  categories: string[] = [];
  newCategory: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Load categories from localStorage or use defaults
    const savedCategories = localStorage.getItem('categories');
    const today = new Date();
    this.expense.date = today.toISOString().slice(0, 10);
    this.categories = savedCategories
      ? JSON.parse(savedCategories)
      : ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];
  }

  addCategory() {
    const trimmed = this.newCategory.trim();
    if (trimmed && !this.categories.includes(trimmed)) {
      this.categories.push(trimmed);
      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.newCategory = '';
    }
  }

  onSubmit() {
    if (
      this.expense.date &&
      this.expense.category &&
      this.expense.amount !== undefined &&
      this.expense.amount > 0
    ) {
      const newExpense: Expense = {
        id: Date.now(),
        date: this.expense.date,
        category: this.expense.category,
        amount: Number(this.expense.amount),
        description: this.expense.description || ''
      };

      // Get existing expenses from localStorage
      const saved = localStorage.getItem('expenses');
      const expenses = saved ? JSON.parse(saved) : [];
      expenses.unshift(newExpense); // Add newest first

      // Save back to localStorage
      localStorage.setItem('expenses', JSON.stringify(expenses));

      // Optionally emit event (if used elsewhere)
      this.expenseAdded.emit(newExpense);

      // Reset form
      this.expense = { date: '', category: '', amount: 0, description: '' };

      // Navigate back to list
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}