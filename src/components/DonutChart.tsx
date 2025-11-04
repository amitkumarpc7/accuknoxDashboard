import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from "recharts";
import type { WidgetData } from "../types/dashboard";

interface DonutChartProps {
  data: WidgetData;
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const { segments, total } = data;

  if (!segments || segments.length === 0) return null;

  // Calculate total value from segments if not provided
  const calculatedTotal = segments.reduce(
    (sum, segment) => sum + segment.value,
    0
  );
  const displayTotal = total || calculatedTotal;

  // Prepare data for Recharts
  const chartData = segments.map((segment) => ({
    name: segment.label,
    value: segment.value,
    color: segment.color,
  }));

  // Custom center label
  const renderCustomizedLabel = ({ cx, cy }: { cx: number; cy: number }) => {
    return (
      <g>
        <Text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={24}
          fontWeight="bold"
          fill="#1f2937"
        >
          {displayTotal}
        </Text>
        <Text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
          fill="#6b7280"
        >
          Total
        </Text>
      </g>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 w-full">
      <div className="relative" style={{ width: "180px", height: "180px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              stroke="#fff"
              strokeWidth={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {renderCustomizedLabel({ cx: 90, cy: 90 })}
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-2">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-sm text-gray-700">
              {segment.label} ({segment.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
