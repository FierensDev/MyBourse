import Chart from 'chart.js/auto';
import { ACTUAL_DATE } from '../config/config';
import type { ChartConfig } from '../models/Chart';

let chartInstance: Chart | null = null;

export function renderChart(chartConfig: ChartConfig): void {
  if(chartConfig.selectedStocks.length === 0) return;
  if (chartInstance) chartInstance.destroy();

  const dateRange = new Date(ACTUAL_DATE);
  dateRange.setDate(dateRange.getDate() - chartConfig.daysToSubtract)

  const stockOnDateRange = chartConfig.selectedStocks[0].history.filter(row => new Date(row.date) > dateRange)

  const stockDatasets: { label: string, data: number[] }[] = []

  chartConfig.selectedStocks.forEach(stock => {
    stockDatasets.push({
      label: `Prix de l'action ${stock.name}`,
      data: stock.history.filter(row => new Date(row.date) > dateRange).map(r => r.price)
    })
  });

  chartInstance = new Chart(
    document.getElementById('renderChart') as HTMLCanvasElement,
    {
      type: chartConfig.type,
      data: {
        labels: stockOnDateRange.map(r => r.date),
        datasets: stockDatasets
        
      }
    }
  );
}
