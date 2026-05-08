import Chart from 'chart.js/auto';
import type { Stock } from '../models/Stock';
import { ACTUAL_DATE } from '../config/config';

let chartInstance: Chart | null = null;

export function renderChart(stock: Stock, type: string, daysToSubtract: number): void {

  if (chartInstance) chartInstance.destroy();

  const dateRange = new Date(ACTUAL_DATE);
  dateRange.setDate(dateRange.getDate() - daysToSubtract)

  const stockOnDateRange = stock.history.filter(r => new Date(r.date) > dateRange)

  chartInstance = new Chart(
    document.getElementById('renderChart') as HTMLCanvasElement,
    {
      type: type,
      data: {
        labels: stockOnDateRange.map(r => r.date),
        datasets: [
          {
            label: `Prix de l'action ${stock.name}`,
            data: stockOnDateRange.map(r => r.price)
          }
        ]
      }
    }
  );
}
