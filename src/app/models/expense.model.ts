export interface Expense {
  id: number;
  date: string;        // ISO format
  category: string;
  amount: number;
  description?: string;
}