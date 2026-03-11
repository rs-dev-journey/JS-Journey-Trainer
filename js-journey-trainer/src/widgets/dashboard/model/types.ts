export interface ChartData {
  label: string;
  value: number;
}

export interface ChartState {
  data: ChartData[];
  colors: string[];
}

export interface DashboardCardConfig {
  id: string;
  title: string;
  wide?: boolean;
}