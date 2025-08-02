import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideRouter([
      { path: '', component: ExpenseListComponent },
      { path: 'add-expense', component: ExpenseFormComponent },
      { path: 'header', component: HeaderComponent }, // Added route for HeaderComponent
      { path: 'dashboard', component: DashboardComponent } // Added route for DashboardComponent
    ])
  ]
};