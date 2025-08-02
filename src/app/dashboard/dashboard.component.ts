import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../models/expense.model';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];

  // Monthly Expense Bar Chart
  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  // Category-wise Pie Chart
  pieChartLabels: string[] = [];
  pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };

  // Highest Expense Category
  highestCategory: string = '';
  highestAmount: number = 0;

  ngOnInit() {
    const saved = localStorage.getItem('expenses');
    this.expenses = saved ? JSON.parse(saved) : [];

    this.prepareMonthlyBarChart();
    this.prepareCategoryPieChart();
    this.prepareHighestCategory();
  }

  prepareMonthlyBarChart() {
    const monthlyTotals: { [key: string]: number } = {};
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    months.forEach(m => monthlyTotals[m] = 0);

    this.expenses.forEach(exp => {
      const date = new Date(exp.date);
      const month = months[date.getMonth()];
      monthlyTotals[month] += exp.amount;
    });

    this.barChartLabels = months;
    this.barChartData = {
      labels: months,
      datasets: [
        {
          label: 'Monthly Expenses',
          data: months.map(m => monthlyTotals[m]),
          backgroundColor: '#007bff'
        }
      ]
    };
  }

  prepareCategoryPieChart() {
    const categoryTotals: { [key: string]: number } = {};
    this.expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    this.pieChartLabels = Object.keys(categoryTotals);
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            '#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6610f2', '#fd7e14'
          ]
        }
      ]
    };
  }

  prepareHighestCategory() {
    const categoryTotals: { [key: string]: number } = {};
    this.expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    let max = 0;
    let cat = '';
    for (const [key, value] of Object.entries(categoryTotals)) {
      if (value > max) {
        max = value;
        cat = key;
      }
    }
    this.highestCategory = cat;
    this.highestAmount = max;
  }
}