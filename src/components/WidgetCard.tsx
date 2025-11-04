import React from "react";
import { X } from "lucide-react";
import type { Widget } from "../types/dashboard";
import DonutChart from "./DonutChart";

interface WidgetCardProps {
  widget: Widget;
  categoryId: string;
  onRemove: (categoryId: string, widgetId: string) => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  categoryId,
  onRemove,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{widget.name}</h3>
        <button
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded transition-colors"
          onClick={() => onRemove(categoryId, widget.id)}
          title="Remove widget"
        >
          <X size={16} />
        </button>
      </div>
      <div className="min-h-[120px] flex flex-col items-center justify-center">
        {widget.type === "donut" && widget.data ? (
          <DonutChart data={widget.data} />
        ) : (
          <>
            {widget.text && (
              <p className="text-sm text-gray-600 text-center my-2">
                {widget.text}
              </p>
            )}
            {widget.data && widget.data.segments && (
              <>
                <div className="flex w-full h-2 rounded-full overflow-hidden mt-4">
                  {widget.data.segments.map((segment, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: `${(segment.value / widget.data!.value) * 100}%`,
                        backgroundColor: segment.color,
                      }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-3 justify-center">
                  {widget.data.segments.map((segment, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="text-xs text-gray-700">
                        {segment.label} ({segment.value})
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WidgetCard;
