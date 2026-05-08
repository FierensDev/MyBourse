import type { Stock } from "./Stock";

export interface ChartConfig {
  selectedStocks: Stock[],
  daysToSubtract: number,
  type: ChartType
}

export type ChartType = 'bar' | 'line' | 'bubble' | 'doughnut' | 'pie' | 'polarArea' | 'radar' | 'scatter'