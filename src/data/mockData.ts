import type { DashboardData, Widget } from "../types/dashboard";

export const allAvailableWidgets: Widget[] = [
  {
    id: "widget-1",
    name: "Cloud Accounts",
    text: "",
    type: "donut",
    data: {
      value: 2,
      total: 4,
      segments: [
        { label: "Connected", value: 2, color: "#3b82f6" },
        { label: "Not Connected", value: 2, color: "#e5e7eb" },
      ],
    },
  },
  {
    id: "widget-2",
    name: "Cloud Account Risk Assessment",
    text: "",
    type: "donut",
    data: {
      value: 9659,
      total: 9659,
      segments: [
        { label: "Failed", value: 1689, color: "#ef4444" },
        { label: "Warning", value: 681, color: "#f59e0b" },
        { label: "Not available", value: 36, color: "#9ca3af" },
        { label: "Passed", value: 7253, color: "#10b981" },
      ],
    },
  },
  {
    id: "widget-3",
    name: "Top 5 Namespace Specific Alerts",
    text: "No Graph data available!",
    type: "text",
  },
  {
    id: "widget-4",
    name: "Workload Alerts",
    text: "No Graph data available!",
    type: "text",
  },
  {
    id: "widget-5",
    name: "Image Risk Assessment",
    text: "1470 Total Vulnerabilities",
    type: "text",
    data: {
      value: 1470,
      total: 1470,
      segments: [
        { label: "Critical", value: 9, color: "#7f1d1d" },
        { label: "High", value: 150, color: "#dc2626" },
      ],
    },
  },
  {
    id: "widget-6",
    name: "Image Security Issues",
    text: "2 Total Images",
    type: "text",
    data: {
      value: 2,
      total: 2,
      segments: [
        { label: "Critical", value: 2, color: "#7f1d1d" },
        { label: "High", value: 2, color: "#dc2626" },
      ],
    },
  },
  {
    id: "widget-7",
    name: "Network Traffic",
    text: "Monitoring network activity across all endpoints",
    type: "text",
  },
  {
    id: "widget-8",
    name: "Compliance Status",
    text: "Overall compliance score: 87%",
    type: "text",
  },
  {
    id: "widget-9",
    name: "Threat Detection",
    text: "12 active threats detected",
    type: "text",
  },
  {
    id: "widget-10",
    name: "System Performance",
    text: "All systems operational",
    type: "text",
  },
];

export const initialDashboardData: DashboardData = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [allAvailableWidgets[0], allAvailableWidgets[1]],
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [allAvailableWidgets[2], allAvailableWidgets[3]],
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [allAvailableWidgets[4], allAvailableWidgets[5]],
    },
  ],
};
