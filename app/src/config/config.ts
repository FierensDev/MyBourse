import type { ChartType } from "../models/Chart";

export const API_URL: string = 'https://keligmartin.github.io/api/stocks.json';
export const ACTUAL_DATE = "2026-05-31"
export const CHART_TYPE: ChartType[] = ['bar', 'line', 'bubble', 'doughnut', 'pie', 'polarArea', 'radar', 'scatter'];
export const DAYS_TO_SUBSTRACT: { label:string, value:number}[] = [
  {label: '1 semaine', value: 7},
  {label: '1 mois', value: 30},
  {label: '1 an', value: 365}
]