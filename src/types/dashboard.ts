export interface WidgetSegment {
  label: string;
  value: number;
  color: string;
}

export interface WidgetData {
  value: number;
  total: number;
  segments?: WidgetSegment[];
}

export interface Widget {
  id: string;
  name: string;
  text: string;
  type?: "donut" | "text";
  data?: WidgetData;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}

export interface DashboardContextType {
  dashboardData: DashboardData;
  addWidget: (categoryId: string, widget: Widget) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  updateCategoryWidgets: (categoryId: string, widgetIds: string[]) => void;
}
