import Chart from 'chart.js/auto';
import { ACTUAL_DATE } from '../config/config';
import type { ChartConfig } from '../models/Chart';

let chartInstance: Chart | null = null;

export function renderChart(chartConfig: ChartConfig): void {
  console.log(`deunsLog : `, chartConfig)
  if(!chartConfig.selectedStock) return;
  if (chartInstance) chartInstance.destroy();

  const dateRange = new Date(ACTUAL_DATE);
  dateRange.setDate(dateRange.getDate() - chartConfig.daysToSubtract)

  const stockOnDateRange = chartConfig.selectedStock.history.filter(row => new Date(row.date) > dateRange)

  chartInstance = new Chart(
    document.getElementById('renderChart') as HTMLCanvasElement,
    {
      type: chartConfig.type,
      data: {
        labels: stockOnDateRange.map(r => r.date),
        datasets: [
          {
            label: `Prix de l'action ${chartConfig.selectedStock.name}`,
            data: stockOnDateRange.map(r => r.price)
          }
        ]
        
      }
    }
  );
}
