import type { Stock } from "./Stock";

export interface ChartConfig {
  selectedStock: Stock | null,
  daysToSubtract: number,
  type: ChartType
}

export type ChartType = 'bar' | 'line' | 'bubble' | 'doughnut' | 'pie' | 'polarArea' | 'radar' | 'scatter'