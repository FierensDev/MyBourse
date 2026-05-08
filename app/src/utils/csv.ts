import type { ChartConfig } from "../models/Chart";

export function exportToCSV(chartConfig: ChartConfig): void {
  //premiere ligne avec en tete du tableau
  let csvContent = "data:text/csv;charset=utf-8,Stock,Date,Prix\n";

  chartConfig.selectedStocks.forEach(stock => {
    stock.history.forEach(row => {
      csvContent += `${stock.name},${row.date},${row.price}\n`;
    });
  });

  const encodedUri = encodeURI(csvContent);
  // referme automatiquement donc marche pas..
  // window.open(encodedUri);

  const a = document.createElement('a');
  a.href = encodedUri;
  a.download = 'stocks.csv';
  a.click();
}