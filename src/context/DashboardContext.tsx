import React, { createContext, useContext, useState } from "react";
import type {ReactNode} from "react";
import type {
  DashboardData,
  DashboardContextType,
  Widget,
} from "../types/dashboard";
import { initialDashboardData, allAvailableWidgets } from "../data/mockData";

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(initialDashboardData);

  const addWidget = (categoryId: string, widget: Widget) => {
    setDashboardData((prev) => ({
      categories: prev.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, widget] }
          : cat
      ),
    }));
  };

  const removeWidget = (categoryId: string, widgetId: string) => {
    setDashboardData((prev) => ({
      categories: prev.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter((w) => w.id !== widgetId) }
          : cat
      ),
    }));
  };

  const updateCategoryWidgets = (categoryId: string, widgetIds: string[]) => {
    setDashboardData((prev) => ({
      categories: prev.categories.map((cat) => {
        if (cat.id === categoryId) {
          const updatedWidgets = widgetIds
            .map((id) => allAvailableWidgets.find((w) => w.id === id))
            .filter(Boolean) as Widget[];
          return { ...cat, widgets: updatedWidgets };
        }
        return cat;
      }),
    }));
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        addWidget,
        removeWidget,
        updateCategoryWidgets,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
